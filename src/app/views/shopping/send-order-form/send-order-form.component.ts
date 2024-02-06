import { OrderItem } from '../../../entities/OderItem';
import { Component, Input } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { CarItem } from '../../../entities/CarItem';
import { CarOrder } from '../../../entities/CarOrder';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProducModalServiceService } from '../../../services/produc-modal-service.service';

@Component({
  selector: 'app-send-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-order-form.component.html',
  styleUrl: './send-order-form.component.css'
})
export class SendOrderFormComponent {

  public title: string = 'Send Order Form';
  public orderData: CarOrder = {} as CarOrder;
  @Input() public carItems: CarItem[] = [];
  @Input() public showSendOrderForm: boolean = false;
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

  closeModal() {
    this.showSendOrderForm = false;
  }
}
