import { createPasswordHash } from '../services/auth';

const mysql = require('../mysql/mysql').pool;

class UsuarioController {
    async create(req, res) {
        try {
            const { usuario, senha } = req.body;

            const encryptedPassword = await createPasswordHash(senha);
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO usuario (Usr_Login, Usr_Senha) VALUES ("${usuario}","${encryptedPassword}")`,
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
            const { usuario, senha } = req.body;
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
                                `UPDATE usuario SET Usr_Login = "${usuario}", Usr_Senha = "${encryptedPassword}" WHERE Usr_Codigo = "${id}"`,
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