/*export class Carrito {
  idUser: number; // O string, dependiendo de cómo manejes el ID de usuario
  productos: { producto: any; cantidad: number }[];

  constructor(idUser: number, productos: { producto: any; cantidad: number }[]) {
    this.idUser = idUser;
    this.productos = productos;
  }
}

 */
export class Carrito {
  idUser: number; // O string
  productos: { id_producto: number; cantidad: number }[];

  constructor(idUser: number, productos: { id_producto: number; cantidad: number }[]) {
    this.idUser = idUser;
    this.productos = productos;
  }
}
