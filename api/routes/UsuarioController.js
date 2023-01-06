import { createPasswordHash } from '../services/auth';

const mysql = require('../mysql/mysql').pool;

class UsuarioController {
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT USR.Usr_Codigo, USR.Usr_Login, USR.Fun_Codigo, CONCAT(USR.Fun_Codigo, " - ", FUN.Fun_Nome) AS Funcionario FROM usuario USR ` + 
                    `LEFT JOIN funcionario FUN ON USR.Fun_Codigo = FUN.Fun_Codigo`,
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

    async show(req, res) {
        try {
            const { id } = req.params;
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT Usr_Login, Fun_Codigo FROM usuario WHERE Usr_Codigo = ${id}`,
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
            const { usuario, senha, codFuncionario } = req.body;

            const encryptedPassword = await createPasswordHash(senha);
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT Usr_Codigo FROM usuario WHERE Usr_Login = "${usuario}"`,
                    (error, result, fields) => {
                        if (JSON.stringify(result) !== '[]') {
                            return res.status(406).json();
                        } else {
                            conn.query(
                                `INSERT INTO usuario (Usr_Login, Usr_Senha, Fun_Codigo) VALUES ("${usuario}","${encryptedPassword}", ${codFuncionario!=''&&codFuncionario!=null?`${codFuncionario}`:'NULL'})`,
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
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { usuario, senha, codFuncionario } = req.body;
            const encryptedPassword = await createPasswordHash(senha);

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT Usr_Codigo FROM usuario WHERE Usr_Codigo <> ${id} AND Usr_Login = "${usuario}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) !== '[]') {
                            return res.status(406).json();
                        }
                        else {
                            conn.query(
                                `UPDATE usuario SET Usr_Login = "${usuario}", Usr_Senha = "${encryptedPassword}", Fun_Codigo = ${codFuncionario!=''&&codFuncionario!=null?`${codFuncionario}`:'NULL'} WHERE Usr_Codigo = "${id}"`,
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