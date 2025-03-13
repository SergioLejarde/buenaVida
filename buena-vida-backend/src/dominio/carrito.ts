export class Carrito {
    constructor(
      public id: number,
      public usuarioId: number,
      public productos: { productoId: number; cantidad: number }[]
    ) {}
  }
  