import {Pessoa} from '../pessoa/pessoa.model'

class Order {
  constructor(
    public idCompra: number,
    public idPessoa: Pessoa,
    public estado: number,
    public data: string
  ){}
}

export {Order}
