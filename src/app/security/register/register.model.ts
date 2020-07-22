export class Register {
  email: string = null;
  password: string = null;
  cpfCnpj: number = null;
  tipoPessoa: number = null;
  nome: string = null;
  telefone: number = null;
  endereco: string = null;
  numero: number = null;
  complemento: string = null;
  bairro: string = null;
  cidade: string = null;
  uf: string = null;
  cep: number = null;

  public constructor(init?: Partial<Register>) {
    Object.assign(this, init);
  };
}
// }
