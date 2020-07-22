import {Pessoa} from '../../pessoa/pessoa.model'

export interface Campanha {
  idCampanha: number
  nome: string
  idEmpresa: Pessoa
  dataInicio: string
  dataFim: string
  fotoCampanha: string
  // HTMLImageElement

}
