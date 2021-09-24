import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModalOpen() {
    setNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModalOpen() {
    setNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header {...{ handleOpenNewTransactionModalOpen }} />
      <Dashboard />

      <NewTransactionModal
        newTransactionModalOpen={newTransactionModalOpen}
        handleCloseNewTransactionModalOpen={handleCloseNewTransactionModalOpen}
      />
    </TransactionsProvider>
  );
}
