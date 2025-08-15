import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../services/pos.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent {
  protected readonly posService = inject(PosService);

  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.posService.removeFromCart(productId);
    } else {
      this.posService.updateQuantity(productId, newQuantity);
    }
  }
}
