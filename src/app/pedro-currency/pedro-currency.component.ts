import { Component, OnInit } from '@angular/core';
import { PedroWalletService } from '../pedro-wallet.service';

@Component({
  selector: 'app-pedro-currency',
  templateUrl: './pedro-currency.component.html',
  styleUrls: ['./pedro-currency.component.css'],
})
export class PedroCurrencyComponent implements OnInit {
  constructor(public rate: PedroWalletService) {}

  ngOnInit() {}

  atualizaMoedas() {
    this.rate.atualizaMoedas();
  }
}
