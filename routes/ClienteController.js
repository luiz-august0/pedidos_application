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
        const { nome, cpf, cnpj, telefone } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM cliente WHERE Cli_Cpf = "${cpf}" OR Cli_Cnpj = "${cnpj}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("CPF ou CNPJ já cadastrado");
                        } else {
                            conn.query(
                                `INSERT INTO cliente (Cli_Nome, Cli_Cpf, Cli_Cnpj, Cli_Telefone) ` + 
                                `VALUES ("${nome}", ${cpf!=''?`"${cpf}"`:'NULL'}, ${cnpj!=''?`"${cnpj}"`:'NULL'}, ${telefone!=''?`"${telefone}"`:'NULL'})`,
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

export default new ClienteController();