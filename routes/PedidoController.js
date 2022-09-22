const mysql = require('../mysql/mysql').pool;
import EstoqueController from './EstoqueController';

class PedidoController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido P INNER JOIN pedido_itens PI ON P.Ped_Codigo = PI.Ped_Codigo`,
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
        const { cod_cli, cod_forn, cod_func, vlrTotal, situacao } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO pedido (Cli_Codigo, For_Codigo, Fun_Codigo, Ped_VlrTotal, Ped_Situacao) ` +
                    `VALUES (${cod_cli}, ${cod_forn}, ${cod_func}, ${vlrTotal}, "${situacao}")` ,
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
                                `VALUES (${id}, ${cod_pro}, ${qtd}, ${vlrTotal})` ,
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
        const { cod_cli, cod_forn, cod_func, vlrTotal, situacao } = req.body;
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
                                `UPDATE pedido SET Cli_Codigo = "${cod_cli}", For_Codigo = ${cod_forn} ` + 
                                `Fun_Codigo = ${cod_func}, Ped_VlrTotal = ${vlrTotal}, Ped_Situacao = "${situacao}" WHERE Ped_Codigo = ${id}`,
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

    async showPedItem(req, res) {
        const { cod_pro } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido_itens WHERE Ped_Codigo = ${id} AND Pro_Codigo = ${cod_pro}`,
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