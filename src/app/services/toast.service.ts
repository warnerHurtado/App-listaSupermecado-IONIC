import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'


@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor(private toast: ToastController) { }

  async informationToast(message, type, header) {
    const toast = await this.toast.create({
      message: message,
      color: type,
      duration: 2000,
      animated: true,
      header: header,
    })
    toast.present();
  }
  
}
