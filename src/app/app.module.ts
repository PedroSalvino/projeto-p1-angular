import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedroCurrencyComponent } from './pedro-currency/pedro-currency.component';
import { RouterModule } from '@angular/router';
import { PedroWalletService } from './pedro-wallet.service';
import { HttpClientModule } from '@angular/common/http';
import { PedroWalletComponent } from './pedro-wallet/pedro-wallet.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'currency', component: PedroCurrencyComponent },
      { path: 'wallet', component: PedroWalletComponent },
    ]),
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    NavbarComponent,
    PedroCurrencyComponent,
    PedroWalletComponent,
  ],
  bootstrap: [AppComponent],
  providers: [PedroWalletService],
})
export class AppModule {}
