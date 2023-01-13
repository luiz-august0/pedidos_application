const mysql = require('../mysql/mysql').pool;

export const atualizaEstoque = async(qtd, id, tipo) => {
    try {
        mysql.getConnection((error, conn) => {
            conn.query(
                `UPDATE produto SET Pro_QtdEst = (Pro_QtdEst ${tipo!='dim'?` + `:' - '} ${qtd}) WHERE Pro_Codigo = ${id} `,
                (error, result, fields) => {
                    if (error) { return console.log(error); }
                    return console.log("Operação: " + tipo + " IDProduto: " + id + " QTDE: " + qtd);
                }
            )
            conn.release();
        })
    } catch(err) {
        return console.error(err);
    }
}

class EstoqueController {   
    async addEstoque(req, res) {
        const { id } = req.params;
        const { qtd } = req.body;

        try {
            atualizaEstoque(qtd, id, 'add');
            return res.status(201).json("Estoque adicionado");
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}

export default new EstoqueController();