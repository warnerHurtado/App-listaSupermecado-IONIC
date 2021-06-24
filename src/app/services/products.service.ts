import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  BASE_URL = 'http://localhost:3000'
  //BASE_URL = 'https://market-backend-diseno.herokuapp.com'

  constructor(private http: HttpClient) { }


  onNewProduct(productInformation) {
    return this.http.post(`${this.BASE_URL}/products/newProduct`, productInformation);
  }

  onGetProducts() {
    return this.http.get(`${this.BASE_URL}/products/getProducts`);
  }

  onDeleteProducts(productId) {
    return this.http.post(`${this.BASE_URL}/products/deleteProduct`, productId);
  }

}

