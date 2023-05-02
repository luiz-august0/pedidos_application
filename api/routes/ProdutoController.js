const mysql = require('../mysql/mysql').pool;

class ProdutoController {   
    async index(req, res) {
        const { cod, descricao, unidade, valorUni, estoque, codFornecedor } = req.body;

        let sql = `SELECT P.*, CONCAT(F.For_Codigo," - ",F.For_Nome) as Fornecedor FROM produto P INNER JOIN fornecedor F ON P.For_Codigo = F.For_Codigo WHERE 1 > 0 `;

        if (cod !== '' && cod !== null && cod !== undefined) {
            sql = sql + ` AND Pro_Codigo = ${cod}`;
        }

        if (descricao !== '' && descricao !== null && descricao !== undefined) {
            sql = sql + ` AND Pro_Descricao LIKE "%${descricao}%"`;
        }

        if (unidade !== '' && unidade !== null && unidade !== undefined) {
            sql = sql + ` AND Pro_Unidade = "${unidade}"`;
        }

        if (valorUni !== '' && valorUni !== null && valorUni !== undefined) {
            sql = sql + ` AND Pro_VlrUni = ${valorUni}`;
        }

        if (estoque !== '' && estoque !== null && estoque !== undefined) {
            sql = sql + ` AND Pro_QtdEst <= ${estoque}`;
        }

        if (codFornecedor !== '' && codFornecedor !== null && codFornecedor !== undefined) {
            sql = sql + ` AND P.For_Codigo = ${codFornecedor}`;
        }
    
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    sql,
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

    async create(req, res) {
        const { descricao, unidade, valorUni, fornecedor, qtde } = req.body;
        try {
            mysql.getConnection((error, conn) => {
                    conn.query(
                        `INSERT INTO produto (Pro_Descricao, Pro_Unidade, Pro_VlrUni, Pro_QtdEst, For_Codigo) ` + 
                        `VALUES ("${descricao}", "${unidade}", ROUND(${valorUni},2), ${qtde!=''&&qtde!=null?`${qtde}`:'0'}, ${fornecedor})`,
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

    async update(req, res) {
        const { descricao, unidade, valorUni, fornecedor } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM produto WHERE Pro_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Produto não existe");
                        } else {
                            conn.query(
                                `UPDATE produto SET Pro_Descricao = "${descricao}", Pro_Unidade = "${unidade}", ` + 
                                `Pro_VlrUni = ROUND(${valorUni},2), For_Codigo = ${fornecedor} WHERE Pro_Codigo = ${id}`,
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

    async show(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT P.*, CONCAT(F.For_Codigo," - ",F.For_Nome) as Fornecedor FROM produto P INNER JOIN fornecedor F ON P.For_Codigo = F.For_Codigo WHERE P.Pro_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Produto não existe");
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

    async destroy(req, res) {
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM pedido_itens WHERE Pro_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("Existem pedidos com este produto!");
                        } else {
                            conn.query(
                                `DELETE FROM produto WHERE Pro_Codigo = ${id}`,
                                (error, result, fields) => {
                                    return res.json(result);
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

export default new ProdutoController();