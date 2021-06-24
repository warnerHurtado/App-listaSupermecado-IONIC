import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loading: LoadingController) { }

  async presentLoading() {
    const loading = this.loading.create({
      message: 'Please wait...'
    });

    (await loading).present();

  }
}
