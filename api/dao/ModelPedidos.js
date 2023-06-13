export const sqlDeleteItmPed = (idPedido, cod_pro) => 
`DELETE FROM pedido_itens WHERE Ped_Codigo = ${idPedido} AND Pro_Codigo = ${cod_pro}`;

export const sqlUpdateValorTotalPedido = (idPedido) => 
`UPDATE pedido SET Ped_VlrTotal = (SELECT ROUND(SUM(PedItm_VlrTotal),2) FROM pedido_itens WHERE Ped_Codigo = ${idPedido}) ` + 
`WHERE Ped_Codigo = ${idPedido}`;


export const sqlUpdateItem = (idPedido, idItem, qtd, valorTotal) => 
`UPDATE pedido_itens SET PedItm_Qtd = ${qtd}, PedItm_VlrTotal = ${valorTotal} ` + 
`WHERE Ped_Codigo = ${idPedido} AND Pro_Codigo = ${idItem}`;