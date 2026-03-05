// Definimos la estructura de una transacción para MoneyWise
export interface Transaction {
  id: number;           // Identificador único
  amount: number;       // El monto del gasto o ingreso
  type: 'income' | 'expense'; // Solo permite estos dos valores (Ingreso o Gasto)
  category: string;     // Ejemplo: 'Comida', 'Salario', 'Transporte'
  date: string;         // Fecha en formato texto o ISO
}