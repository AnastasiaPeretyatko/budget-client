import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi'
import { SavingAccountCard } from '@/entities/saving-account'
import BaseCarousel from '@/shared/ui/carousel'

const SavingAccountListCarousel = () => {
  const { data: savingAccounts = [] } = useGetEnvelopesQuery()

  return (
    <BaseCarousel
      data={savingAccounts}
      carouselItemComp={(el) => (
        <SavingAccountCard savingAccount={el}/>
      )}
    />
  )
}

export default SavingAccountListCarousel
