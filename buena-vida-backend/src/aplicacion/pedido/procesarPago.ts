import { PagoStrategy } from "../../dominio/strategies/pagoStrategy";

export class ProcesarPago {
  constructor(private estrategia: PagoStrategy) {}

  ejecutar(monto: number): string {
    return this.estrategia.procesarPago(monto);
  }
}
