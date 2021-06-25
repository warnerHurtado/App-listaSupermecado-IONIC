import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddProductModalPage } from './add-product-modal/add-product-modal.page'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products = []

  constructor(private modalController: ModalController,
    private _productService: ProductsService,
    private toast: ToastService,
    private _loadingService: LoadingService,
    private loading: LoadingController) { }

  ngOnInit() {
    this.onGetProducts();
  }



  async onAdd() {
    const modal = await this.modalController.create({
      component: AddProductModalPage
    });

    modal.onDidDismiss().then(data => {
      if (!data['data']) {
        return;
      }

      this.onSaveProduct(data['data']);

    })
    return await modal.present();
  }


  onSaveProduct(productData) {
    this._productService.onNewProduct(productData).subscribe(response => {
      if (response['success']) {
        this.onGetProducts()
      }
      this.loading.dismiss();
    });
  }

  onGetProducts() {
    this._productService.onGetProducts().subscribe((response: any) => {
      this.products = response['productsList'];
      console.log(this.products, 'Holi')
    });
  }

  onDeleteProduct(productId) {
    this._loadingService.presentLoading();
    this._productService.onDeleteProducts(productId).subscribe(response => {
      if (response['success']) {
        this.onGetProducts();
      } else {
        this.toast.informationToast('Something went wrong deleting the product', 1, 'Error!');
      }
      this.loading.dismiss();
    });
  }


}
