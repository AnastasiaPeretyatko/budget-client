import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

type Props = {
  count: number;
  onChangePage: (page: number) => void
}

export const BasePagination = ({ count, onChangePage }: Props) => {
  const [page, setPage] = useState(1)

  return (
    <Pagination.Root
      count={count}
      pageSize={10}
      page={page}
      onPageChange={(e) => {
        setPage(e.page)
        onChangePage(e.page)
      }}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
