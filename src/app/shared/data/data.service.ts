export class DataService {
  dataHoje(): string{
    const dataAtual = new Date();
    let dia = dataAtual.getDate() < 10 ? '0' + dataAtual.getDate().toString() : dataAtual.getDate().toString()
    let mes = dataAtual.getMonth() < 10 ? '0' + dataAtual.getMonth().toString() : dataAtual.getMonth().toString()
    let ano = dataAtual.getFullYear().toString()
    let hora = dataAtual.getHours() < 10 ? '0' + dataAtual.getHours().toString() : dataAtual.getHours().toString()
    let minuto = dataAtual.getMinutes() < 10 ? '0' + dataAtual.getMinutes().toString() : dataAtual.getMinutes().toString()
    let segundo = dataAtual.getSeconds()  < 10 ? '0' + dataAtual.getSeconds().toString() : dataAtual.getSeconds().toString()

    return ano + '-' + mes + '-' + dia + 'T' + hora + ':' + minuto + ':' + segundo + 'Z';
  }
}
