import { Component } from '@angular/core';
import {CarritoService} from "../carrito/service/carrito.service";

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  qrCodeUrl: string | null = null;

  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    const total = this.cartService.getTotalCost();
    this.generarQR(total);
  }

  generarQR(total: number | null) {
    if (total !== null) {
      const qrData = `Total a pagar: ${total}`;
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
    }
  }

  finalizarCompra() {

  }
}
