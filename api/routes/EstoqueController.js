const mysql = require('../mysql/mysql').pool;
import { sqlAtualizaEstoque } from '../dao/ModelEstoque';

class EstoqueController {   
    async addEstoque(req, res) {
        const { id } = req.params;
        const { qtd } = req.body;

        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    sqlAtualizaEstoque(qtd, id, 'add'),
                    (error, result, fields) => {
                        if (error) { console.log(error) } 
                        return res.status(201).json("Estoque atualizado");
                    }
                )
                conn.release();
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}

export default new EstoqueController();