import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Storage } from '@ionic/storage'
import { MarketService } from 'src/app/services/market.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';




@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  userMarkets = []

  constructor(private alertController: AlertController,
    private _toastService: ToastService,
    private storage: Storage,
    private _marketService: MarketService,
    private _router: Router,
    private loading: LoadingController,
    private _loadingService: LoadingService) { }

  async ngOnInit() {
    this.storage.create();
    await this.getMarkets();
  }


  async newMarketAlert() {

    let alerta = this.alertController.create({
      header: 'Creating market',
      backdropDismiss: false,
      inputs: [
        {
          name: 'marketName',
          type: 'text',
          placeholder: 'Market name'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Market description'
        },
      ],
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {

            if (this.validateAlertData(data)) {
              this._loadingService.presentLoading();
              this.saveMarket(data);
            }
          }
        }
      ]

    });
    (await alerta).present();
  }


  validateAlertData({ marketName, description }) {
    if (marketName.length > 0 && description.length > 0) {
      return true;
    } else {
      this._toastService.informationToast('Values can not be empty', 'danger', 'Error!');
    }
  }

  saveMarket(data) {
    this.storage.get('userInformation').then(userInfo => {
      this._marketService.saveMarket(JSON.parse(userInfo), data).subscribe(response => {
        if (response['success']) {
          this._toastService.informationToast('Market added succesfully', 'success', 'Success!')
          this.getMarkets();
        } else {
          this._toastService.informationToast('Something went wrong!', 'danger', 'Error!')
        }
        this.loading.dismiss();
      })
    });
  }



  getMarkets() {
    this._marketService.getMarkets().then(dataObs => {
      dataObs.subscribe((response: []) => {
        if (!response['data']) {
          return;
        }
        this.userMarkets = response['data'];
        console.log(this.userMarkets)
      })
    })
  }

  onClick(doc) {
    this._router.navigate(['/home/product-lists', doc]);
  }

  onLogout() {
    this.storage.remove('userInformation').then(() => {
      this._router.navigate(['/login']);
    }); 
  }





}