import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public columns = ["id", "name"]
  public rows : Array<Order>;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(){
    this.apiService.get("orders").subscribe((data: Order[]) => {
      console.log(data);
      this.rows = data;
    });
  }

  public delete(id) {
    console.log("delete: " + id);
    var path = 'orders/' + id;

    this.apiService.delete(path).subscribe((r) => {
      this.rows = this.rows.filter((p, i) =>{
        return Number(id) !== p.id
      }, this.rows);
    });
  }

  public update(id) {
    console.log("update: " + id);
    this.router.navigateByUrl("/orders/add/" + id);
  }
}
