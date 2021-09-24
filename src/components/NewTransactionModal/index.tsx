import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactionsContext } from "../../contexts/TransactionsContext";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

type Props = {
  newTransactionModalOpen: boolean;
  handleCloseNewTransactionModalOpen: () => void;
};

export function NewTransactionModal({
  newTransactionModalOpen,
  handleCloseNewTransactionModalOpen,
}: Props) {
  const { createTransaction } = useTransactionsContext();

  const [transactionType, setTransactionType] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  function formInvalid() {
    return !transactionType.trim() || !title.trim() || !category.trim() || amount < 1;
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (formInvalid()) return;

    await createTransaction({
      type: transactionType,
      title,
      category,
      amount,
    });

    setTransactionType("");
    setTitle("");
    setCategory("");
    setAmount(0);
    handleCloseNewTransactionModalOpen();
  }

  return (
    <Modal
      isOpen={newTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModalOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseNewTransactionModalOpen}
        className="btn-ract-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            activeColor="green"
            active={transactionType === "deposit"}
            type="button"
            onClick={() => {
              setTransactionType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            activeColor="red"
            active={transactionType === "withdraw"}
            type="button"
            onClick={() => {
              setTransactionType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit" disabled={formInvalid()}>
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}
