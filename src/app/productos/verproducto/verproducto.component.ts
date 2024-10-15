import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { producto } from '../model/producto';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {
  producto: producto | null = null; // Producto que se mostrará
  selectedQuantity: number = 1; // Cantidad seleccionada por defecto

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.loadProducto();
  }

  loadProducto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.productosService.findProductoById(id).subscribe(
      (producto: producto) => {  
        this.producto = producto; 
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
      }
    );
}


  agregarAlCarrito(producto: producto, cantidad: number): void {
    if (cantidad <= producto.stock && cantidad > 0) {
      console.log(`Agregar ${cantidad} unidades de ${producto.name} al carrito.`);
      // Aquí puedes implementar la lógica para agregar el producto al carrito
    } else {
      console.error('Cantidad no válida o no hay suficiente stock disponible.');
    }
  }
}
