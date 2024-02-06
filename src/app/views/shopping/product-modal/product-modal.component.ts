import { Component, Input } from '@angular/core';
import { Product } from '../../../entities/Product';
import { ProductServiceService } from '../../../services/product-service.service';
import { ProducModalServiceService } from '../../../services/produc-modal-service.service';
import { CommonModule } from '@angular/common';
import { CarItem } from '../../../entities/CarItem';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {

  public showModal: boolean = false;
  public title: string = 'Product Details';
  @Input() public item: CarItem = {} as CarItem;
  constructor(private _productService: ProductServiceService, private _modalService : ProducModalServiceService) {}
  get productService() {
    return this._productService;
  }
  get modalService() {
    return this._modalService;
  }
  closeModal() {
    this.modalService.close();
  }
}
