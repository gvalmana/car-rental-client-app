import { CarItem } from './../../../entities/CarItem';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {
  title: string = 'Car Form';
  public items: CarItem[] = [];

  constructor(private prouductService: ProductServiceService) {}

  public removeItem(item: CarItem) {
    console.log(item);
  }
  ngOnInit(): void {
    this.prouductService.getProductos().pipe(

    ).subscribe((response) => {
      this.items = response.data.map((item: any) => {
        return {
          product: item,
          quantity: 0
        };
      });
    })
  }
}
