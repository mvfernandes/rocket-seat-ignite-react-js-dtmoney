import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { moneyFormater } from "../../utils";

import { Container } from "./styles";

export function Summary() {
  const { deposits, withdraws } = useTransactionsContext();
  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={incomeImg} />
        </header>
        <strong>{moneyFormater(deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} />
        </header>
        <strong>-{moneyFormater(withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} />
        </header>
        <strong>{moneyFormater(deposits - withdraws)}</strong>
      </div>
    </Container>
  );
}
