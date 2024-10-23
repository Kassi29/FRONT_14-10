import { Injectable } from '@angular/core';
import { producto } from "../../productos/model/producto";
import {HttpClient} from "@angular/common/http";
import {Carrito} from "../model/carrito";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosCarrito: { producto: producto; cantidad: number }[] = [];

  private totalCost: number | null = null;
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/carrito';


    enviarCarrito(carrito: Carrito) {
      console.log('Enviando carrito al backend:', carrito);
       return this.http.post<Carrito>(this.apiUrl, carrito).pipe(
        tap(response => {
          console.log('Respuesta del backend:', response);
        }),
        catchError(error => {
          console.error('Error al enviar el carrito:', error);
          return throwError(error);
        })
      );
    }



  addToCart(producto: producto, cantidad: number): void {
    console.log('Producto a agregar:', producto);
    const existingProduct = this.productosCarrito.find(p => p.producto.id === producto.id);

    if (existingProduct) {
      const newQuantity = existingProduct.cantidad + cantidad;

      if (newQuantity > producto.stock) {
        alert(`No se puede agregar más cantidad que el stock disponible. Quedan ${producto.stock - existingProduct.cantidad} en stock.`);
        return;
      }

      existingProduct.cantidad = newQuantity; // Actualiza la cantidad
    } else {
      if (cantidad > producto.stock) {
        alert(`No se puede agregar más cantidad que el stock disponible (stock máximo = ${producto.stock}).`);
        return;
      }

      this.productosCarrito.push({ producto: { ...producto }, cantidad });
    }

    console.log('Estado del carrito después de agregar:', this.productosCarrito);
    console.log('Estado del carrito después de agregar:', JSON.stringify(this.productosCarrito, null, 2));
  }

  getCartProducts() {
    return [...this.productosCarrito]; // Devuelve una copia del carrito
  }
  deleteProduct(producto: producto): void {
    const index = this.productosCarrito.findIndex(p => p.producto.id === producto.id);
    if (index !== -1) {
      this.productosCarrito.splice(index, 1); // Elimina el producto
      console.log(`Producto eliminado: ${producto.name}`);
    }
  }
  setTotalCost(total: number): void {
    this.totalCost = total;
  }

  getTotalCost(): number | null {
    return this.totalCost;
  }

  clearCart() {
    this.productosCarrito = []; // Limpia el carrito
    console.log('Carrito limpiado.');
  }

}
