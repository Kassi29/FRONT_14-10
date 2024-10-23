import { Component } from '@angular/core';
import {CarritoService} from "../carrito/service/carrito.service";
import {Router} from "@angular/router";
import {AuthService} from "../realAuth/service/auth.service";
import {Carrito} from "../carrito/model/carrito";

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  qrCodeUrl: string | null = null;

  constructor(private cartService: CarritoService ,  private router: Router,  private authService: AuthService) {}

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
    const currentUser = this.authService.getCurrentUser(); // Obtiene el usuario actual

    if (currentUser) {
      const idUser = currentUser.id; // Obtén el ID del usuario
      const productos = this.cartService.getCartProducts();

      // Asegúrate de que los productos tengan el formato correcto
      const carrito = new Carrito(idUser, productos.map(item => ({
        id_producto: item.producto.id, // Usar id_producto en lugar de producto
        cantidad: item.cantidad
      })));

      this.cartService.enviarCarrito(carrito).subscribe({
        next: (response) => {
          console.log('Respuesta del backend al finalizar compra:', response);
          alert('Compra finalizada con éxito!');
          this.cartService.clearCart(); // Limpia el carrito después de la compra
          this.router.navigate(['/web2/inicio']); // Redirige al inicio
        },
        error: (err) => {
          console.error('Error al enviar el carrito:', err);
          alert('Hubo un error al procesar la compra. Intenta de nuevo.');
        }
      });
    } else {
      alert('No se pudo obtener el usuario actual.');
    }
  }


}
