import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/add/:id', component: ProductAddComponent },          
  { path: 'orders/add', component: OrderAddComponent },
  { path: 'orders/add/:id', component: OrderAddComponent },          
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'customers/add/:id', component: CustomerAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
