import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

type Props = {
  handleOpenNewTransactionModalOpen: () => void;
};

export function Header({ handleOpenNewTransactionModalOpen }: Props) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={handleOpenNewTransactionModalOpen}>Nova transação</button>
      </Content>
    </Container>
  );
}
