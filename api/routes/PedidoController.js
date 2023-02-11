const mysql = require('../mysql/mysql').pool;
import { atualizaEstoque } from './EstoqueController';
import pdfMakePrinter from "pdfmake";

//Funções gerais
const deleteItmPed = async(idPedido, cod_pro) => {
    try {
        mysql.getConnection((error, conn) => {
            conn.query(
                `DELETE FROM pedido_itens WHERE Ped_Codigo = ${idPedido} AND Pro_Codigo = ${cod_pro}`,
                (error, result, fields) => {
                    if (error) { console.log(error) } 
                }
            )
            conn.release();
        })
    } catch(err) {
        console.log(err)
    }
}

const updateValorTotalPedido = async(idPedido) => {
    try {
        mysql.getConnection((error, conn) => {
            conn.query(
                `UPDATE pedido SET Ped_VlrTotal = (SELECT ROUND(SUM(PedItm_VlrTotal),2) FROM pedido_itens WHERE Ped_Codigo = ${idPedido}) ` + 
                `WHERE Ped_Codigo = ${idPedido}`,
                (error, result, fields) => {
                    if (error) { console.log(error) } 
                }
            )
            conn.release();
        })
    } catch(err) {
        console.log(err)
    }
}

const updateItem = async(idPedido, idItem, qtd, valorTotal) => {
    try {
        mysql.getConnection((error, conn) => {
            conn.query(
                `UPDATE pedido_itens SET PedItm_Qtd = ${qtd}, PedItm_VlrTotal = ${valorTotal} ` + 
                `WHERE Ped_Codigo = ${idPedido} AND Pro_Codigo = ${idItem}`,
                (error, result, fields) => {
                    if (error) { console.log(error) } 
                }
            )
            conn.release();
        })
    } catch(err) {
        console.log(err)
    }
}

const generatePdf = (docDefinition, callback) => {
    try {
        const fontDescriptors = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new pdfMakePrinter(fontDescriptors);
        const doc = printer.createPdfKitDocument(docDefinition);
      
        let chunks = [];
        let result = '';
  
        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });
  
        doc.on('end', () => {
            result = Buffer.concat(chunks);
            callback('data:application/pdf;base64,' + result.toString('base64'));
        });
      
        doc.end();
      
        } catch(err) {
            throw(err);
        }
};
//Fim Funções gerais

class PedidoController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT P.Ped_Codigo, CONCAT(P.Cli_Codigo," - ",C.Cli_Nome) AS Cliente,
                    CONCAT(P.Fun_Codigo," - ",FUN.Fun_Nome) AS Funcionario,
                    P.Ped_VlrTotal, 
                    IF(P.Ped_Situacao = "A", "ABERTO", "FECHADO") AS Situacao, CONVERT(Ped_Data, CHAR) AS Ped_Data
                    FROM pedido P
                    INNER JOIN cliente C ON P.Cli_Codigo = C.Cli_Codigo
                    INNER JOIN funcionario FUN ON P.Fun_Codigo = FUN.Fun_Codigo
                    ORDER BY P.Ped_Codigo DESC`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async createPed(req, res) {
        const { cod_cli, cod_func, vlrTotal, situacao } = req.body;
        let data = new Date().toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"});
        let dateParts = data.split('/');
        let year = Number(dateParts[2]);
        let month = Number(dateParts[1]);
        let day = Number(dateParts[0]);
        let dateSQL = year + '-' + month + '-' + day;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO pedido (Cli_Codigo, Fun_Codigo, Ped_VlrTotal, Ped_Situacao, Ped_Data) ` +
                    `VALUES (${cod_cli}, ${cod_func}, ROUND(${vlrTotal},2), "${situacao}", "${dateSQL}")` ,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async createPedItem(req, res) {
        const { cod_pro, qtd, vlrTotal, atualizaTotal } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido_itens WHERE Ped_Codigo = ${id} AND Pro_Codigo = ${cod_pro}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("Produto já consta no pedido");
                        } else {
                            conn.query(
                                `INSERT INTO pedido_itens (Ped_Codigo, Pro_Codigo, PedItm_Qtd, PedItm_VlrTotal) ` +
                                `VALUES (${id}, ${cod_pro}, ${qtd}, ROUND(${vlrTotal},2))` ,
                                (error, result, fields) => {
                                    if (error) { return res.status(500).send({ error: error }) }
                                    const updateDados = async() => {
                                        await atualizaEstoque(qtd, cod_pro, 'dim');
                                        if (atualizaTotal) {
                                            await updateValorTotalPedido(id);
                                        }
                                    }

                                    updateDados()
                                        .then(() => {
                                            return res.status(201).json(result);
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            return res.status(401).json(error);
                                        })
                                }
                            )
                        }
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async updatePedItem(req, res) {
        const { cod_pro, qtd, vlrTotal } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT PedItm_Qtd FROM pedido_itens WHERE Ped_Codigo = ${id} AND Pro_Codigo = ${cod_pro}` ,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        const updateDados = async() => {
                            if (qtd > result[0].PedItm_Qtd) {
                                await atualizaEstoque((qtd - result[0].PedItm_Qtd), cod_pro, 'dim');
                            } else if (qtd < result[0].PedItm_Qtd) {
                                await atualizaEstoque((result[0].PedItm_Qtd - qtd), cod_pro, 'add');
                            }
                            await updateItem(id, cod_pro, qtd, vlrTotal);
                            await updateValorTotalPedido(id);
                        }

                        updateDados()
                            .then(() => {
                                return res.status(201).json(result);
                            })
                            .catch(error => {
                                console.log(error)
                                return res.status(401).json(error);
                            })
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async deleteItemPed(req, res) {
        const { id, cod_pro } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT PedItm_Qtd FROM pedido_itens WHERE Ped_Codigo = ${id} AND Pro_Codigo = ${cod_pro}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) } 
                            const updateDados = async() => {
                                await atualizaEstoque(result[0].PedItm_Qtd, cod_pro, 'add');
                                await deleteItmPed(id, cod_pro);
                                await updateValorTotalPedido(id);
                            }
                            updateDados()
                                .then(() => {
                                    return res.status(201).json(result);
                                })
                                .catch(error => {
                                    console.log(error)
                                    return res.status(401).json(error);
                                })
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async updatePed(req, res) {
        const { cod_cli, cod_func, vlrTotal, situacao } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido WHERE Ped_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Pedido não existe");
                        } else {
                            conn.query(
                                `UPDATE pedido SET Cli_Codigo = "${cod_cli}", Fun_Codigo = ${cod_func}, ` + 
                                `Ped_VlrTotal = ROUND(${vlrTotal},2), Ped_Situacao = "${situacao}" WHERE Ped_Codigo = ${id}`,
                                (error, result, fields) => {
                                    if (error) { return res.status(500).send({ error: error }) }
                                    return res.status(201).json(result);
                                }
                            )
                        }
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async updatePedSituacao(req, res) {
        const { id } = req.params;
        const { situacao } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE pedido SET Ped_Situacao = "${situacao}" WHERE Ped_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async showPed(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido P INNER JOIN pedido_itens PI ON P.Ped_Codigo = PI.Ped_Codigo WHERE P.Ped_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Pedido não existe");
                        } else {
                            return res.status(201).json(result);
                        }
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async showPedItens(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT PI.Pro_Codigo, CONCAT(PI.Pro_Codigo," - ",P.Pro_Descricao) AS Produto, P.Pro_Unidade, PI.PedItm_Qtd, PI.PedItm_VlrTotal, ` + 
                    `P.Pro_Descricao FROM pedido_itens PI ` + 
                    `INNER JOIN produto P ON PI.Pro_Codigo = P.Pro_Codigo ` + 
                    `WHERE PI.Ped_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Produto inexistente no pedido");
                        } else {
                            return res.status(201).json(result);
                        }
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async deletePed(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido WHERE Ped_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Pedido não existe");
                        } else {
                            conn.query(
                                `DELETE FROM pedido WHERE Ped_Codigo = ${id}`,
                                (error, result, fields) => {
                                    return res.status(201).json(result);
                                }
                            )
                        }
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async getPedidoDetails(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT P.Ped_Codigo, P.Cli_Codigo, C.Cli_Nome,
                    P.Fun_Codigo, FUN.Fun_Nome, P.Ped_VlrTotal, 
                    IF(P.Ped_Situacao = "A", "ABERTO", "FECHADO") AS Situacao, DATE_FORMAT(Ped_Data,'%d/%m/%Y') AS Ped_Data
                    FROM pedido P
                    INNER JOIN cliente C ON P.Cli_Codigo = C.Cli_Codigo
                    INNER JOIN funcionario FUN ON P.Fun_Codigo = FUN.Fun_Codigo
                    WHERE P.Ped_Codigo = ${id}
                    ORDER BY P.Ped_Codigo DESC`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
      
    async getReportPed(req, res) {
        const { id } = req.params;
        const { dataPedido, dataPedidoItens } = req.body;

        const styleFormat = {minimumFractionDigits: 2};

        const cliente = dataPedido[0].Cli_Nome;
        const funcionario = dataPedido[0].Fun_Nome;
        const pedVlrTotal = 'R$' + new Intl.NumberFormat('pt-BR', styleFormat).format(dataPedido[0].Ped_VlrTotal);
        const situacao = dataPedido[0].Situacao;
        const data = dataPedido[0].Ped_Data;
        const itensDetails = dataPedidoItens;
        let itens = [];

        for await (let item of itensDetails) {
            const rows = new Array();
            rows.push(item.Pro_Codigo);
            rows.push(item.Pro_Descricao);
            rows.push(item.Pro_Unidade);
            rows.push(item.PedItm_Qtd);
            rows.push('R$' + new Intl.NumberFormat('pt-BR', styleFormat).format(item.PedItm_VlrTotal / item.PedItm_Qtd));
            rows.push('R$' + new Intl.NumberFormat('pt-BR', styleFormat).format(item.PedItm_VlrTotal));

            itens.push(rows);
        }

        const docDefinition = { 
            pageSize: 'A4',
            pageMargins: [ 30, 60, 30, 40 ],
            footer: 
                function(currentPage, pageCount) { 
                    return [
                        {text: 'Página ' + currentPage.toString() + ' de ' + pageCount, 
                        alignment: 'center', fontSize: 10}
                    ]; 
                },
            content: [
                {
                    columns: [
                        {
                            alignment: 'center',
                            bold: true,
                            fontSize: 18,
                            text: `Pedido NR. ${id}`
                        },
                    ]
                },
                '\n\n',
                {
                    columns: [
                        {
                            alignment: 'left',
                            bold: true,
                            fontSize: 12,
                            text: `Cliente: ${cliente}`
                        },
                        {
                            alignment: 'right',
                            bold: true,
                            fontSize: 12,
                            text: `Data: ${data}`
                        }
                    ], 
                },
                '\n',
                {
                    columns: [
                        {
                            alignment: 'left',
                            bold: true,
                            fontSize: 12,
                            text: `Funcionário: ${funcionario}`
                        },
                        {
                            alignment: 'right',
                            bold: true,
                            fontSize: 12,
                            text: `Situação: ${situacao}`
                        }
                    ]
                },
                '\n\n',
                {
                    columns: [
                        {
                            alignment: 'center',
                            bold: true,
                            fontSize: 18,
                            text: `Itens`
                        }
                    ]
                },
                '\n',
                {
                    margin: [0, 5, 0, 15],
                    fontSize: 10,
                    table: {
                        heights: function (row) {
                            return 25;
                        },
                        headerRows: 1,
                        widths: [ 55, 155, 50, 70, 75, 75 ],
                        body: [
                            [
                                {text: 'Código', fontSize: 12, bold: true}, 
                                {text: 'Descrição', fontSize: 12, bold: true},
                                {text: 'Unidade', fontSize: 12, bold: true},
                                {text: 'Quantidade', fontSize: 12, bold: true}, 
                                {text: 'Valor Uni', fontSize: 12, bold: true}, 
                                {text: 'Valor Total', fontSize: 12, bold: true}
                            ], ...itens
                        ],
                    }
                },
                {
                    canvas: [
                        { type: 'line', x1: 0, y1: 5, x2: 595-2*30, y2: 5, lineWidth: 1 }
                    ]
                },
                '\n',
                {
                    columns: [
                        {
                            alignment: 'right',
                            bold: true,
                            fontSize: 14,
                            text: `Valor Total: ${pedVlrTotal}`
                        }
                    ]
                }
            ],
            defaultStyle: {
                font: 'Helvetica'
            }};
      
        generatePdf(
            docDefinition,
            function(base64String) {
                res.status(201).send(base64String);
            },
            function(error) {
                res.status(404).send("ERROR:" + error);
            }
        );
    }
}

export default new PedidoController();