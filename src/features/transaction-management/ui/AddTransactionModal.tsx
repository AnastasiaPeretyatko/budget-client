import BaseModal from '@/shared/ui/modal'
import BaseTabs from '@/shared/ui/tabs'
import { Button } from '@chakra-ui/react'
import ExpenceTransactionModal from './ExpenceTransactionModal'
import IncomeTransactionModal from './IncomeTransactionModal'
import TransferTransactionModal from './TransferTransactionModal'

const getList = (onClose: () => void) => [
  {
    value: 'Expence',
    component: <ExpenceTransactionModal onClose={onClose}/>
  },
  {
    value: 'Income',
    component: <IncomeTransactionModal onClose={onClose}/>
  },
  {
    value: 'Transfer',
    component: <TransferTransactionModal onClose={onClose}/>
  }
]

const AddTransactionModal = () => {
  return (
    <BaseModal title='Добавить транзакцию' buttonTrigger={<Button size={'sm'}>Добавить транзакцию</Button>} showFooter={false}>
      {(close) => <BaseTabs list={getList(close)} isBorder/>}
    </BaseModal>
  )
}

export default AddTransactionModal
