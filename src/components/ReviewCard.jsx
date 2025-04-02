import { useNavigate } from "react-router-dom"
import { Badge, Card, CardBody, Image, Icon, Stack, Text, Heading } from "@chakra-ui/react"
import { HiStar } from "react-icons/hi"

import PropTypes from "prop-types"

const categoryColors = {
  technology: "yellow",
  health: "teal",
  food: "orange",
  travel: "pink",
  education: "purple",
}

const ReviewCard = ({ review }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/review/${review.id}`)
  }

  return (
    <Card onClick={handleClick} cursor="pointer">
      <CardBody>
        <Image src={review.imgurl} alt={review.title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{review.title}</Heading>
          <Stack direction="row" gap="1">
            <Icon color="orange.400" boxSize="5" as={HiStar} alignSelf="center">
              <HiStar />
            </Icon>
            <Text fontWeight="medium">{review.rating}/5</Text>
          </Stack>
          <Badge
            variant="solid"
            color="black.500"
            colorScheme={categoryColors[review.category] ? categoryColors[review.category] : "gray"}
            borderRadius="full"
            w="fit-content"
            p={4}
            py={1}
            textAlign="center"
          >
            {review.category}
          </Badge>
        </Stack>
      </CardBody>
    </Card>
  )
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    imgurl: PropTypes.string.isRequired,
  }).isRequired,
}

export default ReviewCard
