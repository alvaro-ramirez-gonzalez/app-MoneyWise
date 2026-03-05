export interface Transaccion {
  id: string;
  amount: number;       // El monto del movimiento
  category: string;     // Ej: 'Comida', 'Sueldo', 'Transporte'
  type: 'income' | 'expense'; // Solo permite estos dos valores
  date: string;         // Fecha en formato ISO
  note?: string;        // Nota opcional
  icon?: string;        // Nombre del icono de Ionic (opcional)
}