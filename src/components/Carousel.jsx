//

import { useRef } from "react"
import { Box, IconButton } from "@chakra-ui/react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const images = [
  "https://ik.imagekit.io/akita311/header2.jpg?updatedAt=1743587748048",
  "https://ik.imagekit.io/akita311/header1.jpg?updatedAt=1743585731913",
]

export default function Carousel() {
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <Box position="relative" width={["100%", "70%"]} margin="auto" overflow="hidden" my={6}>
      <IconButton
        size={["xs", "sm"]}
        aria-label="Previous Slide"
        icon={<FaArrowLeft />}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        bg="yellow.400"
        _hover={{ bg: "yellow.600" }}
        borderRadius="full"
        onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
      />
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <Box key={index} as="img" src={src} width="100%" borderRadius="md" />
        ))}
      </Slider>
      <IconButton
        size={["xs", "sm"]}
        aria-label="Next Slide"
        icon={<FaArrowRight />}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        bg="yellow.400"
        _hover={{ bg: "yellow.600" }}
        borderRadius="full"
        onClick={() => sliderRef.current && sliderRef.current.slickNext()}
      />
    </Box>
  )
}
