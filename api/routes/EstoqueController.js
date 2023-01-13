const mysql = require('../mysql/mysql').pool;

class EstoqueController {   
    async dimEstoque(qtd, id) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE produto SET Pro_QtdEst = (Pro_QtdEst - ${qtd}) WHERE Pro_Codigo = ${id} `,
                    (error, result, fields) => {
                        if (error) { return console.log(error); }
                        return console.log("ID: " + id + " QTDE: " + qtd);
                    }
                )
                conn.release();
            })
        } catch(err) {
            return console.error(err);
        }
    }

    async addEstoque(req, res) {
        const { id } = req.params;
        const { qtd } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT Pro_Codigo FROM produto WHERE Pro_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json('Produto não existe');
                        } else {
                            conn.query(
                                `UPDATE produto SET Pro_QtdEst = (Pro_QtdEst + ${qtd}) WHERE Pro_Codigo = ${id} `,
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
}

export default new EstoqueController();