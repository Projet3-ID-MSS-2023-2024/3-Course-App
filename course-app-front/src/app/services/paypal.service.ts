import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  payPalConfig!: IPayPalConfig;

  constructor() { }

  // email: sb-pfa1222784084@personal.example.com
  // mdp: p!V.L6f*

  //config paypal
  public initConfig(prix:string): IPayPalConfig {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AQY5t6tEDcJUBlLt9jAyxh-pTXXIKimV6HE6KGOr_lk72bOEZfpSmC4uHHF-DtDxR75wbBzr2gIL4uUI',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value:  prix,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: prix
              }
            }
          },
          items: [
            {
              name: 'Course',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: prix,
              },
            }
          ]
        }
      ]
    },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Success', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    return this.payPalConfig;
  }
}
