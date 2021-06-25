import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'market',
        loadChildren: () => import('../pages/market/market.module').then(m => m.MarketPageModule)
      },
      {
        path: 'product-lists/:id',
        loadChildren: () => import('../pages/product-lists/product-lists.module').then(m => m.ProductListsPageModule)
      },
      // {
      //   path: 'products',
      //   loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsPageModule)
      // },
      {
        path: '',
        redirectTo: 'market',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
