import { OrderItem } from './../../entities/OderItem';
import { Component, Input } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { CarItem } from '../../entities/CarItem';
import { CarOrder } from '../../entities/CarOrder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-order-form',
  standalone: true,
  imports: [],
  templateUrl: './send-order-form.component.html',
  styleUrl: './send-order-form.component.css'
})
export class SendOrderFormComponent {

  public title: string = 'Send Order Form';
  public orderData: CarOrder = {} as CarOrder;
  @Input() public carItems: CarItem[] = [];
  constructor(private _productService: ProductServiceService) {}

  sendOrder() {+
    this.orderData.items.push(...this.carItems);
    console.log(this.orderData);
    this._productService.sendOder(this.orderData).subscribe(
      response => {
        Swal.fire(response.message, '', 'success')
      }
    );
  }
}
