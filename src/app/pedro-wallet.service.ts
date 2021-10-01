import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DolarRealRate {
  bpi: {
    USD: {
      rate_float: number;
    };
    BRL: {
      rate_float: number;
    };
  };
}

interface EuroRate {
  bpi: {
    EUR: {
      rate_float: number;
    };
  };
}

@Injectable()
export class PedroWalletService {
  constructor(private http: HttpClient) {
    this.atualizaMoedas();
  }

  bitCoinRateUSDBRL: Array<DolarRealRate> = [];
  bitCoinRateEUR: Array<EuroRate> = [];

  private statusBRL: boolean = null;
  private statusUSD: boolean = null;
  private statusEUR: boolean = null;

  private saldo: number = 0;

  // métodos do component Currency

  atualizaDolarReal() {
    this.http
      .get<DolarRealRate>(
        'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
      )
      .subscribe((data) => {
        if (this.bitCoinRateUSDBRL.length == 0) {
          this.bitCoinRateUSDBRL.push(data);
        }

        if (
          this.compararValores(
            this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.USD
              .rate_float,
            data.bpi.USD.rate_float
          ) != 0 ||
          this.compararValores(
            this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.BRL
              .rate_float,
            data.bpi.BRL.rate_float
          ) != 0
        ) {
          if (
            this.compararValores(
              this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.USD
                .rate_float,
              data.bpi.USD.rate_float
            ) == 1
          ) {
            this.statusUSD = true;
          } else if (
            this.compararValores(
              this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.USD
                .rate_float,
              data.bpi.USD.rate_float
            ) == 2
          ) {
            this.statusUSD = false;
          }

          if (
            this.compararValores(
              this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.BRL
                .rate_float,
              data.bpi.BRL.rate_float
            ) == 1
          ) {
            this.statusBRL = true;
          } else if (
            this.compararValores(
              this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.BRL
                .rate_float,
              data.bpi.BRL.rate_float
            ) == 2
          ) {
            this.statusBRL = false;
          }
          this.bitCoinRateUSDBRL.push(data);
        }
      });
  }

  atualizaEuro() {
    this.http
      .get<EuroRate>('https://api.coindesk.com/v1/bpi/currentprice/EUR.json')
      .subscribe((data) => {
        if (this.bitCoinRateEUR.length == 0) {
          this.bitCoinRateEUR.push(data);
        }

        if (
          this.compararValores(
            this.bitCoinRateEUR[this.bitCoinRateEUR.length - 1].bpi.EUR
              .rate_float,
            data.bpi.EUR.rate_float
          ) != 0
        ) {
          if (
            this.compararValores(
              this.bitCoinRateEUR[this.bitCoinRateEUR.length - 1].bpi.EUR
                .rate_float,
              data.bpi.EUR.rate_float
            ) == 1
          ) {
            this.statusEUR = true;
          } else if (
            this.compararValores(
              this.bitCoinRateEUR[this.bitCoinRateEUR.length - 1].bpi.EUR
                .rate_float,
              data.bpi.EUR.rate_float
            ) == 2
          ) {
            this.statusEUR = false;
          }
          this.bitCoinRateEUR.push(data);
        }
      });
  }

  atualizaMoedas() {
    setInterval(() => {
      this.atualizaDolarReal();
      this.atualizaEuro();
    }, 5000);
  }

  compararValores(valorAnt: number, valorAtual: number) {
    if (valorAnt != valorAtual) {
      if (valorAtual > valorAnt) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }

  // métodos do component wallet
  getSaldo() {
    return this.saldo;
  }

  sacar(valor: number) {
    if (valor <= this.getSaldo()) {
      this.saldo -= valor;
    }
  }

  depositar(valor: number) {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  getSaldoReal() {
    if (this.bitCoinRateUSDBRL.length > 0) {
      return (
        this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.BRL
          .rate_float * this.getSaldo()
      );
    }
  }

  getSaldoDolar() {
    if (this.bitCoinRateUSDBRL.length > 0) {
      return (
        this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.USD
          .rate_float * this.getSaldo()
      );
    }
  }

  getSaldoEuro() {
    if (this.bitCoinRateEUR.length > 0) {
      return (
        this.bitCoinRateEUR[this.bitCoinRateEUR.length - 1].bpi.EUR.rate_float *
        this.getSaldo()
      );
    }
  }

  getSaldoBitcoin() {
    if (this.bitCoinRateUSDBRL.length > 0) {
      return this.bitCoinRateUSDBRL[this.bitCoinRateUSDBRL.length - 1].bpi.BRL
        .rate_float;
    }
  }

  //métodos do component NavbarComponent
  getStatusDolar() {
    return this.statusUSD;
  }
  getStatusBitcoin() {
    return this.statusBRL;
  }
  getStatusEuro() {
    return this.statusEUR;
  }
}
