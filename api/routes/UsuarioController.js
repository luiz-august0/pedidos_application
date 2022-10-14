import { createPasswordHash } from '../services/auth';

const mysql = require('../mysql/mysql').pool;

class UsuarioController {
    async show(req, res) {
        try {
            const { id } = req.params;
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT Usr_Login, Usr_Funcionario FROM usuario WHERE Usr_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { usuario, senha, isFuncionario } = req.body;

            const encryptedPassword = await createPasswordHash(senha);
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO usuario (Usr_Login, Usr_Senha, Usr_Funcionario) VALUES ("${usuario}","${encryptedPassword}", "${isFuncionario}")`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { usuario, senha, isFuncionario } = req.body;
            const encryptedPassword = await createPasswordHash(senha);

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM usuario WHERE Usr_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json();
                        }
                        else {
                            conn.query(
                                `UPDATE usuario SET Usr_Login = "${usuario}", Usr_Senha = "${encryptedPassword}", Usr_Funcionario = "${isFuncionario}" WHERE Usr_Codigo = "${id}"`,
                            (error, result, fields) => {
                                if (error) { return res.status(500).send({ error: error }) }
                                return res.status(201).json(result);
                            }
                            )
                        }
                    }
                )
                conn.release();
            });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM usuario WHERE Usr_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json();
                        }
                        
                        conn.query(
                            `DELETE FROM usuario WHERE Usr_Codigo = "${id}"`,
                        (error, result, fields) => {
                            if (error) { return res.status(500).send({ error: error }) }
                            return res.status(201).json(result);
                        }
                        )
                       
                    }
                )
                conn.release();
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new UsuarioController();