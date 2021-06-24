import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PhotoUploaderService {

  constructor(private storage: AngularFireStorage) {

  }

  async uploadPhoto(productName,imgUrl) {

    const imgName = 'product_'+productName + String(Date.now())
    return await this.storage.upload(imgName, imgUrl).then( () => {
      return imgName;
    });
  }
}
