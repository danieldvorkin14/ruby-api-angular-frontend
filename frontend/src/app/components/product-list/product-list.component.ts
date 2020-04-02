import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  columns = ['id','name'];
  rows : Array<Product>;

  constructor(public apiService: ApiService , public router: Router) {
    
  }

  ngOnInit() {
    this.apiService.get("products").subscribe((data : Product[])=>{
      console.log(data);
      this.rows = data;
    });
  }

  delete(id){
    console.log("delete : " + id);
    var path = 'products/' + id;

    this.apiService.delete(path).subscribe((r)=>{
      this.rows = this.rows.filter((p, i) => {
        return Number(id) !== p.id
      }, this.rows)
    });
  }

  update(id){
    console.log("update : " + id );
    this.router.navigateByUrl('/products/add/' + id);
  }

}
