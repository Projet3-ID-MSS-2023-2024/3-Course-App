import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  payPalConfig!: IPayPalConfig;

  constructor() { }

  //config paypal
  public initConfig(prix:string): IPayPalConfig {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AWpk_a-hWHPi1cQjnyU9y_vCj0Cmrad94GijeuZEz8RZ21C9ST6TnSXkZgPP2dvDLR_-piHDyQnl2EQX',
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
              name: 'Enterprise Subscription',
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
