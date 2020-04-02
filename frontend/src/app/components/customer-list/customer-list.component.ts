import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  columns = ['id', 'name'];
  rows: Array<Customer>;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(){
    this.apiService.get("customers").subscribe((data: Customer[]) => {
      console.log(data);
      this.rows = data;
    });
  }

  delete(id){
    console.log("delete: " + id);
    var path = "customers/" + id;

    this.apiService.delete(path).subscribe((r) => {
      this.rows = this.rows.filter((p, i) => {
        return Number(id) !== p.id
      }, this.rows);
    });
  }

  update(id){
    console.log("update: " + id);
    this.router.navigateByUrl("/customers/add/" + id);
  }

}
