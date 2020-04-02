import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  order: Order = new Order();

  constructor(public apiService: ApiService, public acRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(){
    this.acRoute.params.subscribe((data: any ) => {
      console.log(data.id);

      if(data && data.id){
        this.apiService.get("/orders/" + data.id).subscribe((data: Order) => {
          this.order = data;
        })
      } else {
        this.order = new Order();
      }
    })
  }

  onSubmit(){
   if(this.order.id){
      this.apiService.update("orders/" + this.order.id, this.order).subscribe((r) => {
        this.router.navigateByUrl("/orders");
      });
   } else {
     this.apiService.post("orders", this.order).subscribe((r) => {
      this.order = new Order();

      this.router.navigateByUrl("/orders");
     });
   }
  }
}
