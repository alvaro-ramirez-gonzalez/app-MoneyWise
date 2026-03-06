export interface Transaccion {
  id: string;
  amount: number;       // Antes: monto
  category: string;     // Antes: categoria
  type: 'income' | 'expense'; // Antes: 'ingreso' | 'gasto'
  date: string;         // Antes: fecha
  receipt?: string | null; // Antes: comprobante (RF-3)
  note?: string;        // Antes: nota
  icon?: string;        // Antes: icono
}