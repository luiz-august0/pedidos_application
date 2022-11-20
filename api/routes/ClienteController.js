const mysql = require('../mysql/mysql').pool;

class ClienteController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM cliente`,
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
        const { nome, cpf, cnpj, contato } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM cliente WHERE Cli_CPF = "${cpf}" OR Cli_CNPJ = "${cnpj}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("CPF ou CNPJ já cadastrado");
                        } else {
                            conn.query(
                                `INSERT INTO cliente (Cli_Nome, Cli_CNPJ, Cli_CPF, Cli_Contato) ` + 
                                `VALUES ("${nome}", ${cnpj!=''&&cnpj!=null?`"${cnpj}"`:'NULL'}, ${cpf!=''&&cpf!=null?`"${cpf}"`:'NULL'}, ` + 
                                `${contato!=''&&contato!=null?`"${contato}"`:'NULL'})`,
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

    async update(req, res) {
        const { nome, cpf, cnpj, contato } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM cliente WHERE Cli_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Cliente não existe");
                        } else {
                            conn.query(
                                `UPDATE cliente SET Cli_Nome = "${nome}", Cli_CNPJ = ${cnpj!=''&&cnpj!=null?`"${cnpj}"`:'NULL'}, ` + 
                                `Cli_CPF = ${cpf!=''&&cpf!=null?`"${cpf}"`:'NULL'}, Cli_Contato = ${contato!=''&&contato!=null?`"${contato}"`:'NULL'} ` + 
                                `WHERE Cli_Codigo = ${id}`,
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
                    `SELECT * FROM cliente WHERE Cli_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Cliente não existe");
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
                    `SELECT * FROM pedido WHERE Cli_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("Existem pedidos vinculados a este cliente!");
                        } else {
                            conn.query(
                                `DELETE FROM cliente WHERE Cli_Codigo = ${id}`,
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

export default new ClienteController();