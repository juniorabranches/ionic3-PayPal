import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { PayPal, PayPalPayment, PayPalConfiguration,  PayPalPaymentDetails} from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private payPal: PayPal, public navCtrl: NavController) {

  }

  comprar(){
    this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AdFooVoJD-JJTRxolApqxaIUajuYMG8TGYpwvl5ngeBer7xdF1Or4eZCOFOATlnv6efysAlQW13NPNTe'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: true,
        languageOrLocale: 'pt-BR',
        merchantName: 'CanalDoAbranches',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''
      })).then(() => {
        let detail = new PayPalPaymentDetails('19.99', '0.00', '0.00');
        let payment = new PayPalPayment('19.99', 'BRL', 'CanalDoAbranches', 'Sale', detail);
        this.payPal.renderSinglePaymentUI(payment).then((response) => {
          console.log('pagamento efetuado')
        }, () => {
          console.log('erro ao renderizar o pagamento do paypal');
        })
      })
    })
  }


}
