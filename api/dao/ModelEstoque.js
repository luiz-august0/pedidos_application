export const sqlAtualizaEstoque = (qtd, id, tipo) => 
`UPDATE produto SET Pro_QtdEst = (Pro_QtdEst ${tipo!='dim'?` + `:' - '} ${qtd}) WHERE Pro_Codigo = ${id} `;