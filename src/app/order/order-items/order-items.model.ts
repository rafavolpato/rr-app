import { Order } from '../order.model'
import { ProdutoCampanha } from 'app/campanha-detalhes/produto-campanha/produto-campanha.model'

interface OrderItems {
    idItemCompra: number,
    idCompra: Order,
    idProdutoCampanha: ProdutoCampanha,
    qtd: number,
    valor: number
}

interface OrderItemsPost {
    idItemCompra: number,
    idCompra: number,
    idProdutoCampanha: number,
    qtd: number,
    valor: number
}

export {OrderItems, OrderItemsPost}
