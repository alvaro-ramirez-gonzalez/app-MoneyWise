import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private TRANSACTIONS_KEY = 'moneywise_transactions';

  constructor() {}

  
  async addTransaction(transaction: any) {
    const transactions = await this.getTransactions();
    transactions.unshift(transaction); 
    await Preferences.set({
      key: this.TRANSACTIONS_KEY,
      value: JSON.stringify(transactions)
    });
  }

 
  async getTransactions() {
    const { value } = await Preferences.get({ key: this.TRANSACTIONS_KEY });
    return value ? JSON.parse(value) : [];
  }

  // Calcular el saldo total
  async getBalance() {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc: number, item: any) => {
      return item.type === 'ingreso' ? acc + item.amount : acc - item.amount;
    }, 0);
  }
}