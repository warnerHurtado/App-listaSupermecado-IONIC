import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ToastService } from 'src/app/services/toast.service';
import { PhotoUploaderService } from 'src/app/services/photo-uploader.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.page.html',
  styleUrls: ['./add-product-modal.page.scss'],
})
export class AddProductModalPage implements OnInit {

  productForm: FormGroup
  imgUrl;
  preview;

  url;

  product_tags = ['Grains', 'Candies', 'Canned', 'Drinks', 'Desserts']

  constructor(private modalCrtl: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private toast: ToastService,
    private uploader: PhotoUploaderService,
    private storage: AngularFireStorage,
    private _loadingService : LoadingService) { }


  ngOnInit() {
    this.generateForm();
  }

  dimissModal() {
    this.modalCrtl.dismiss( false );
  }

  generateForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.maxLength(20), Validators.required]],
      estimatedCost: ['', Validators.required],
      tag: ['', Validators.required]
    })
  }

  cameraOptions: CameraOptions = {

    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    quality: 100,
    saveToPhotoAlbum: true,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.DATA_URL
  }


  onUpload() {
    this.camera.getPicture(this.cameraOptions).then(imgData => {
      this.imgUrl = 'data:image/jpeg;base64,' + imgData
      this.preview = this.imgUrl;
    }).catch(() => {
      this.toast.informationToast('Something went wrong selecting the image', 0, 'Image error')
    })
  }

  async onSubmit() {
    if (!this.productForm.valid) {
      return;
    }

    this._loadingService.presentLoading();
    var downloadToken = '';
    if ( this.imgUrl ){
      await this.imageConverter( this.productForm.value['productName'] ).then( response => { downloadToken = response });
    }
    this.onSavingProduct(downloadToken);
  }

  onSavingProduct(downloadToken) {
    this.productForm.value['url'] = downloadToken;
    this.modalCrtl.dismiss( this.productForm.value );
  }

  onDeleteImage() {
    this.preview = undefined;
    this.imgUrl = undefined;
  }

  async imageConverter( productName ) {
    const imageFile = this.base64ToImage(this.imgUrl);
    var imageName = '';
    await this.uploader.uploadPhoto(productName,imageFile).then(url => { imageName = url });
    return await this.storage.ref( imageName ).getDownloadURL().toPromise();
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }


}
