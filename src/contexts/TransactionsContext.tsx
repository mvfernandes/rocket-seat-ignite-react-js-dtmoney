import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export type Transaction = {
  title: string;
  amount: number;
  category: string;
  type: string;
  id: string;
  createdAt: Date;
};

export type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionContextType = {
  transactions: Transaction[];
  deposits: number;
  withdraws: number;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};
export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deposits, setDeposits] = useState(0);
  const [withdraws, setWithdraws] = useState(0);

  useEffect(() => {
    function calculateTransaction(cur: number, acc: Transaction, type: string) {
      if (acc.type === type) {
        cur += acc.amount;
      }
      return cur;
    }

    setDeposits(transactions.reduce((cur, acc) => calculateTransaction(cur, acc, "deposit"), 0));
    setWithdraws(transactions.reduce((cur, acc) => calculateTransaction(cur, acc, "withdraw"), 0));
  }, [transactions]);

  useEffect(() => {
    api.get("?transactions").then((response) => {
      setTransactions(response.data);
    });
  }, []);

  async function createTransaction({ title, amount, type, category }: TransactionInput) {
    const result = await api.post("?transactions", {
      title,
      amount,
      category,
      type,
    });

    setTransactions((prev) => [
      ...prev,
      { amount, title, type, category, createdAt: result.data.createdAt, id: result.data.id },
    ]);
  }

  async function deleteTransaction(id: string) {
    const result = await api.delete(`?transactions&transactionId=${id}`);

    setTransactions(result.data);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        deposits,
        withdraws,
        createTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
