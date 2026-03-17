import { RootState } from '@/common/store.config';
import TransactionTable from '@/features/TransactionTable';
import { Button, Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';


export default function Home() {
  const {transaction} = useSelector((state: RootState) => state.transactions)

  return (
    <Container padding={10}>
      <Button>Создать транзакцию</Button>
      <TransactionTable/>
    </Container>
  );
}
