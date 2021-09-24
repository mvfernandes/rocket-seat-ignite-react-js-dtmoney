import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormater, moneyFormater } from "../../utils";
import { Container } from "./styles";

import trashImg from "../../assets/trash.svg";

export function TransationsTable() {
  const { transactions, deleteTransaction } = useTransactionsContext();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === "withdraw" && "-"}
                {moneyFormater(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{dateFormater(transaction.createdAt)}</td>
              <td>
                <span
                className="icon-trash"
                  onClick={() => {
                    deleteTransaction(transaction.id);
                  }}
                >
                  <img src={trashImg} alt="Deletar" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
