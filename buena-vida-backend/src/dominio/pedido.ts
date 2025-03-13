export class Pedido {
    constructor(
      public id: number,
      public usuarioId: number,
      public total: number,
      public fecha: Date,
      public estado: string,
      public productos: { productoId: number; cantidad: number; precio: number }[]
    ) {}
  }
  