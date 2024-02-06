import { CarItem } from './../../../entities/CarItem';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../../../entities/Product';
import { ProducModalServiceService } from '../../../services/produc-modal-service.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css',
})
export class CarFormComponent {
  public title: string = 'Car Form';
  public items: CarItem[] = [];
  public car: CarItem = {} as CarItem;
  public precio_total: number = 0;
  public impuestos: number = 2;
  public total: number = 0;
  public caption: string = 'Selecione la cantidad de productos';
  public selectedProduct: CarItem | undefined;
  constructor(private prouductService: ProductServiceService, private _modalService: ProducModalServiceService) {}

  public addItem(item: CarItem) {
    item.quantity++;
    this.updatePreview();
  }

  public removeItem(item: CarItem) {
    item.quantity--;
    this.updatePreview();
  }

  public cotizar() {
    console.log('COMENZANDO A COTIZAR');
  }

  public updatePreview() {
    this.total = 0;
    let total_items = 0;
    this.items.forEach((item) => {
      this.total = this.total + item.product.price * item.quantity;
      total_items+=item.quantity;
    });
    if (total_items > 10) {
      this.impuestos = 3;
    } else {
      this.impuestos = 2;
    }
    this.precio_total = this.total + (this.total * this.impuestos) / 100;
  }

  public showProduct(item: CarItem) {
    console.log(item);
  }

  public cleanPreview() {
    this.items.forEach((item) => {
      item.quantity = 0;
    });
    this.updatePreview();
  }

  showModal(item: CarItem): void {
    this.selectedProduct = item;
    this._modalService.show();
  }

  ngOnInit(): void {
    this.prouductService
      .getProductos()
      .pipe()
      .subscribe((response) => {
        this.items = response.data.map((item: any) => {
          return {
            product: item,
            quantity: 0,
          };
        });
      });
  }
}
