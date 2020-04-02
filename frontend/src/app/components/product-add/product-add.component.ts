import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ApiService } from '../../services/api.service';  
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product();

  constructor(public apiService: ApiService, public acRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(){
    this.acRoute.params.subscribe((data: any) => {
      if(data && data.id){
        this.apiService.get("products/" + data.id).subscribe((data: Product) => { 
          this.product = data; 
        });
      } else {
        this.product = new Product();
      }
    });
  }

  onSubmit(){
    console.log("Adding a product: " + this.product.name);

    if(this.product.id){
      this.apiService.update("products/" + this.product.id, this.product).subscribe((r) => {
        this.router.navigateByUrl("/products");
      });
    } else {
      this.apiService.post("products", this.product).subscribe((r) => {
        this.product = new Product();
        
        this.router.navigateByUrl("/products");
      });
    }
  }
}
