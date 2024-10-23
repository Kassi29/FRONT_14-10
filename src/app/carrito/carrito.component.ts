import { Component, OnInit } from '@angular/core';
import {producto} from "../productos/model/producto";
import {CarritoService} from "./service/carrito.service";
import {AuthService} from "../realAuth/service/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productocarrito: { producto: producto; cantidad: number; }[] = [];
  totalCost: number | null = null; // Inicializa totalCost

  constructor(private cartService: CarritoService, private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    console.log('Cargando productos en el carrito...');
    this.productocarrito = this.cartService.getCartProducts();
    console.log('Productos en el carrito:', this.productocarrito);
  }
  updateQuantity(producto: { producto: producto; cantidad: number }, nuevaCantidad: number): void {
    const cantidad = Number(nuevaCantidad);
    if (cantidad > producto.producto.stock) {
      alert(`No se puede seleccionar más de ${producto.producto.stock} unidades.`);
      return;
    }
    producto.cantidad = cantidad;
  }


  deleteProduct(producto: producto): void {
    this.cartService.deleteProduct(producto);
    this.productocarrito = this.cartService.getCartProducts(); // Actualiza la lista
  }
  calculateTotal(): void {
    this.totalCost = this.productocarrito.reduce((total, producto) => {
      return total + (producto.producto.price * producto.cantidad);
    }, 0);

    // Almacenar el total en el servicio
    this.cartService.setTotalCost(this.totalCost);
  }


  onCheckout() {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/web2/pago']);
      } else {
        this.router.navigate(['web/login']); // Redirige a la página de inicio de sesión
      }
    });
  }

}
