import { Component, OnInit } from '@angular/core';
import { producto } from '../productos/model/producto';
import { ProductosService } from '../productos/service/productos.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: producto[] = [];
  productoSelected: producto = new producto();
  imagenFile: File | null = null;
  previewUrl: string | null = null;
  selectedQuantity: number = 1;

  constructor(private service: ProductosService, private http: HttpClient) {}

  ngOnInit(): void {

  }
  deletePro(producto: producto): void {
    this.service.deletePro(producto.id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== producto.id);
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
    //this.loadProductos();
  }

}
