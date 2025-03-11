export class Producto {
    constructor(
      public id: number,
      public nombre: string,
      public descripcion: string,
      public precio: number,
      public stock: number,
      public categoria: string,
      public imagenUrl?: string
    ) {}
  }
  