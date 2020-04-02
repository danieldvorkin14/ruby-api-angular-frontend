import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  customer: Customer = new Customer();

  constructor(public apiService: ApiService, public acRoute: ActivatedRoute, public router: Router) {}

  ngOnInit(){
    this.acRoute.params.subscribe((data: any) => {
      if(data && data.id) {
        this.apiService.get("/customers/" + data.id).subscribe((data: Customer) => {
          this.customer = data;
        });
      } else {
        this.customer = new Customer();
      }
    });
  }

  onSubmit() {
    if(this.customer.id){
      this.apiService.update("customers/" + this.customer.id, this.customer).subscribe((r) => {
        this.router.navigateByUrl("/customers");
      });
    } else {
      this.apiService.post("customers", this.customer).subscribe((r) => {
        this.customer = new Customer();

        this.router.navigateByUrl("/customers");
      });
    }
  }
}
