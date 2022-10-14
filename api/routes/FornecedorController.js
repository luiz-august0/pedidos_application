const mysql = require('../mysql/mysql').pool;

class FornecedorController {   
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM fornecedor`,
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
        const { nome, razaoSocial, cnpj, cpf, contato } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM fornecedor WHERE For_CNPJ = "${cnpj}" OR For_CPF = "${cpf}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(404).json("CPF ou CNPJ já cadastrado");
                        } else {
                            conn.query(
                                `INSERT INTO fornecedor (For_Nome, For_RazaoSocial, For_CNPJ, For_CPF, For_Contato) ` + 
                                `VALUES ("${nome}", ${razaoSocial!=''&&razaoSocial!=null?`"${razaoSocial}"`:'NULL'}, ${cnpj!=''&&cnpj!=null?`"${cnpj}"`:'NULL'}, ` + 
                                `${cpf!=''&&cpf!=null?`"${cpf}"`:'NULL'}, ${contato!=''&&contato!=null?`"${contato}"`:'NULL'})`,
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
        const { nome, razaoSocial, cnpj, cpf, contato } = req.body;
        const { id } = req.params;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM fornecedor WHERE For_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Fornecedor não existe");
                        } else {
                            conn.query(
                                `SELECT * FROM fornecedor WHERE For_Codigo <> ${id} AND (For_CNPJ = "${cpf}" OR For_CPF = "${cnpj}")`,
                                (error, result, fields) => {
                                    if (error) { return res.status(500).send({ error: error }) }
            
                                    if (JSON.stringify(result) !== '[]') {
                                        return res.status(404).json("CPF ou CNPJ já cadastrado");
                                    } else {                                        
                                        conn.query(
                                            `UPDATE fornecedor SET For_Nome = "${nome}", For_RazaoSocial = ${razaoSocial!=''&&razaoSocial!=null?`"${razaoSocial}"`:'NULL'}, ` + 
                                            `For_CNPJ = ${cnpj!=''&&cnpj!=null?`"${cnpj}"`:'NULL'}, For_CPF = ${cpf!=''&&cpf!=null?`"${cpf}"`:'NULL'}, `+
                                            `For_Contato = ${contato!=''&&contato!=null?`"${contato}"`:'NULL'} ` + 
                                            `WHERE For_Codigo = ${id}`,
                                            (error, result, fields) => {
                                                if (error) { return res.status(500).send({ error: error }) }
                                                return res.status(201).json(result);
                                            }
                                        )
                                    }
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
                    `SELECT * FROM fornecedor WHERE For_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Fornecedor não existe");
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
                    `SELECT * FROM fornecedor WHERE For_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json("Fornecedor não existe");
                        } else {
                            conn.query(
                                `DELETE FROM fornecedor WHERE For_Codigo = ${id}`,
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

export default new FornecedorController();