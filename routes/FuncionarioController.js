const mysql = require('../mysql/mysql').pool;

class FuncionarioController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM funcionario`,
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
        const { nome, cpf, contato } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM funcionario WHERE Fun_CPF = "${cpf}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("CPF já cadastrado");
                        } else {
                            conn.query(
                                `INSERT INTO funcionario (Fun_Nome, Fun_CPF, Fun_Contato) ` + 
                                `VALUES ("${nome}", ${cpf!=''?`"${cpf}"`:'NULL'}, ${contato!=''?`"${contato}"`:'NULL'})`,
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
        const { nome, cpf, contato } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM funcionario WHERE Fun_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Funcionario não existe");
                        } else {
                            conn.query(
                                `UPDATE funcionario SET Fun_Nome = "${nome}", Fun_CPF = ${cpf!=''?`"${cpf}"`:'NULL'}, ` + 
                                `Fun_Contato = ${contato!=''?`"${contato}"`:'NULL'} WHERE Fun_Codigo = ${id}`,
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
                    `SELECT * FROM funcionario WHERE Fun_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Funcionario não existe");
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
                    `SELECT * FROM funcionario WHERE Fun_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Funcionario não existe");
                        } else {
                            conn.query(
                                `DELETE FROM funcionario WHERE Fun_Codigo = ${id}`,
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

export default new FuncionarioController();