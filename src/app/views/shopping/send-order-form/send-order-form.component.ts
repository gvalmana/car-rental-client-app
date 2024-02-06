import { Component, Input } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { CarItem } from '../../../entities/CarItem';
import { CarOrder } from '../../../entities/CarOrder';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-order-form.component.html',
  styleUrl: './send-order-form.component.css',
})
export class SendOrderFormComponent {
  public title: string = 'Send Order Form';
  public orderData: CarOrder = {
    client_email: '',
    client_name: '',
    client_phone: '',
    items: [],
    products: [],
  };
  @Input() public carItems: CarItem[] = [];
  @Input() public showSendOrderForm: boolean = false;
  constructor(private _productService: ProductServiceService) {}

  sendOrder() {
    +console.log(this.orderData);
    this.orderData.items.push(...this.carItems);
    this._productService.sendOder(this.orderData).subscribe((response) => {
      Swal.fire(response.message, '', 'success');
    });
    this.closeModal();
  }

  closeModal() {
    this.showSendOrderForm = false;
  }
}
