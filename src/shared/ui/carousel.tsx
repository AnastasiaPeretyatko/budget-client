import { Carousel, IconButton } from "@chakra-ui/react"
import { ReactNode } from 'react'
import {
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu"

type Props<T> = {
  data: T[]
  carouselItemComp: (val: T) => ReactNode
}

const BaseCarousel = <T,>({ data, carouselItemComp }: Props<T>) => {
  return (
    <Carousel.Root slideCount={data.length} width={'100%'} mx="auto" allowMouseDrag>
      <Carousel.ItemGroup>
        {data.map((el, index) => (
          <Carousel.Item key={index} index={index}>
            {carouselItemComp(el)}
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

export default BaseCarousel
