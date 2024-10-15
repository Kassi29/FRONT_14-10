import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { producto } from '../model/producto';
import { ProductosService } from '../service/productos.service';
import { categoria } from 'src/app/categorias/model/categoria';
import { CategoriasService } from 'src/app/categorias/service/categorias.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: producto[] = [];
  filteredProductos: producto[] = []; // Para los productos filtrados
  productoSelected: producto = new producto();
  categorias: categoria[] = [];
  selectedQuantity: number = 1; // Cantidad seleccionada
  isModalOpen: boolean = false; // Estado del modal
  dropdownOpen: boolean = false; // Estado del dropdown

  registerForm: FormGroup;

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      categoria: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategorias();
  }

  loadProductos(): void {
    this.productosService.findAllPro().subscribe(
      productos => {
        this.productos = productos;
        this.filteredProductos = [...productos]; // Inicialmente, mostrar todos los productos
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  loadCategorias(): void {
    console.log("Cargando categorías...");
    this.categoriasService.findAllCat().subscribe(
      categorias => {
        this.categorias = categorias;
        console.log('Categorías cargadas:', this.categorias);
        if (this.categorias.length > 0) {
          this.registerForm.get('categoria')?.enable();
        }
      },
      error => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  // Nuevo método para mostrar todos los productos
  showAllProducts(): void {
    this.filteredProductos = [...this.productos]; // Mostrar todos los productos
  }

  // Resto del código permanece igual
  agregarAlCarrito(producto: producto, cantidad: number): void {
    console.log(`Agregar ${cantidad} unidades de ${producto.name} al carrito.`);
  }

  resetProductoSelection(): void {
    this.productoSelected = new producto();
    this.selectedQuantity = 1; // Resetear la cantidad al cerrar el modal
  }

  lastCategory(category: { id: number, name: string, description: string }): boolean {
    if (this.productoSelected.categories && this.productoSelected.categories.length > 0) {
      const lastCategory = this.productoSelected.categories[this.productoSelected.categories.length - 1];
      return lastCategory.id === category.id;
    }
    return false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCategoryChange(categoriaId: number): void {
    console.log('Categoría seleccionada:', categoriaId);
    this.dropdownOpen = false; // Cierra el menú después de seleccionar
    this.filterByCategory(categoriaId.toString());
  }

  filterByCategory(categoryId: string): void {
    if (categoryId) {
      this.filteredProductos = this.productos.filter(producto =>
        producto.categories.some(cat => cat.id.toString() === categoryId)
      );
    } else {
      this.filteredProductos = [...this.productos]; // Mostrar todos si no hay filtro
    }
  }
}
