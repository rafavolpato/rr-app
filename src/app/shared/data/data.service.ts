export class DataService {
  dataHoje(): string{
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();

    return ano + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto + ':' + segundo;
  }
}
