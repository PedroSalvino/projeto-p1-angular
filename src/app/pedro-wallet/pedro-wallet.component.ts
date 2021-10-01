import { Component, OnInit } from '@angular/core';
import { PedroWalletService } from '../pedro-wallet.service';
@Component({
  selector: 'app-pedro-wallet',
  templateUrl: './pedro-wallet.component.html',
  styleUrls: ['./pedro-wallet.component.css'],
})
export class PedroWalletComponent implements OnInit {
  constructor(public wallet: PedroWalletService) {}

  ngOnInit() {}

  sacarBRL(valor: string) {
    let calculo = parseFloat(valor) / this.wallet.getSaldoBitcoin();
    this.wallet.sacar(calculo);
  }

  depositarBRL(valor: string) {
    let calculo = parseFloat(valor) / this.wallet.getSaldoBitcoin();
    this.wallet.depositar(calculo);
  }
}
