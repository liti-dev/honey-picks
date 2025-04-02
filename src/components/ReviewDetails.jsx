//
import React from "react"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { Box, Heading, Image, Text, Stack, Badge, Divider, Button } from "@chakra-ui/react"

const ReviewDetails = ({ reviews }) => {
  const { id } = useParams()
  const review = reviews.find((review) => review.id === Number(id)) // Ensure id is a number

  if (!review) {
    return (
      <Box p={4} textAlign="center">
        Review not found
      </Box>
    )
  }

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" maxW="3xl" mx="auto">
      <Stack spacing={4}>
        {review.imgurl ? <Image src={review.imgurl} /> : null}
        <Heading size="lg">{review.title}</Heading>
        <Badge colorScheme="purple" w="fit-content" px={2} py={1} borderRadius="full">
          {review.category}
        </Badge>
        <Text fontSize="lg">{review.text}</Text>
        <Text fontWeight="bold" color="orange.400">
          Rating: {review.rating}/5
        </Text>
        {/* <Button colorScheme="red">Delete this review</Button> */}
        <Divider />
        <Heading size="md" mt={4}>
          Comments
        </Heading>
        {review.comments.length > 0 ? (
          review.comments.map((comment) => (
            <Box key={comment.id} p={3} bg="gray.100" borderRadius="md">
              <Text>{comment.text}</Text>
            </Box>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </Stack>
    </Box>
  )
}

ReviewDetails.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
}

export default ReviewDetails
