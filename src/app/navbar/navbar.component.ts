import { Component, OnInit } from '@angular/core';
import { PedroWalletService } from '../pedro-wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public wallet: PedroWalletService) {}

  ngOnInit() {}
}
