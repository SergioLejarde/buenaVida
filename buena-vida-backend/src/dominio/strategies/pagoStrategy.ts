export interface PagoStrategy {
    procesarPago(monto: number): string;
  }
  
  export class PagoTarjeta implements PagoStrategy {
    procesarPago(monto: number): string {
      return `Pago de ${monto} procesado con tarjeta de crédito.`;
    }
  }
  
  export class PagoEfectivo implements PagoStrategy {
    procesarPago(monto: number): string {
      return `Pago de ${monto} procesado en efectivo.`;
    }
  }
  