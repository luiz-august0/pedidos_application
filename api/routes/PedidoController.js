const mysql = require('../mysql/mysql').pool;
import EstoqueController from './EstoqueController';

class PedidoController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT P.Ped_Codigo, CONCAT(P.Cli_Codigo," - ",C.Cli_Nome) AS Cliente,
                    CONCAT(P.Fun_Codigo," - ",FUN.Fun_Nome) AS Funcionario,
                    P.Ped_VlrTotal, 
                    IF(P.Ped_Situacao = "A", "ABERTO", "FECHADO") AS Situacao, Ped_Data
                    FROM Pedido P
                    INNER JOIN Cliente C ON P.Cli_Codigo = C.Cli_Codigo
                    INNER JOIN Funcionario FUN ON P.Fun_Codigo = FUN.Fun_Codigo`,
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

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO pedido (Cli_Codigo, Fun_Codigo, Ped_VlrTotal, Ped_Situacao, Ped_Data) ` +
                    `VALUES (${cod_cli}, ${cod_func}, ROUND(${vlrTotal},2), "${situacao}", NOW())` ,
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
        const { cod_pro, qtd, vlrTotal } = req.body;
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
                                    EstoqueController.dimEstoque(qtd, cod_pro);
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
                    `SELECT PI.Pro_Codigo, CONCAT(PI.Pro_Codigo," - ",P.Pro_Descricao) AS Produto, P.Pro_Unidade, PI.PedItm_Qtd, PI.PedItm_VlrTotal FROM pedido_itens PI ` + 
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

    async deleteItemPed(req, res) {
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
                                `DELETE FROM pedido_itens WHERE Ped_Codigo = ${id}`,
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

}

export default new PedidoController();