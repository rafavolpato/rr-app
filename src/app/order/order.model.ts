import { ProdutoCampanha } from 'app/campanha-detalhes/produto/produto-campanha.model';
import {Pessoa} from '../pessoa/pessoa.model'

class Order {
  constructor(
    public idCompra: number,
    public idPessoa: Pessoa,
    public idProdutoCampanha: ProdutoCampanha,
    public qtd: number,
    public estado: number,
    public valor: number
  ){}
}

class OrderPost {
  constructor(
    public idCompra: number,
    public idPessoa: number,
    public idProdutoCampanha: number,
    public qtd: number,
    public estado: number,
    public valor: number
  ){}
}

export {Order, OrderPost}
