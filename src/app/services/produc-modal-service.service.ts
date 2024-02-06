import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducModalServiceService {
  public showModal: boolean = false;
  constructor() { }
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  show(): void {
    this.showModal = true;
  }
  close(): void {
    this.showModal = false;
  }
}
