import { Campanha } from "app/campanhas/campanha/campanha.model";

export interface ProdutoCampanha {
  idProdutoCampanha: number
  idCampanha: Campanha
  codProduto: number
  nomeProduto: string
  valor: number
  url: string
}
