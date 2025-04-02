import { useState } from "react"
import { useAuth } from "../AuthContext"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase"
import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  WrapItem,
  Wrap,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react"
import { HiDevicePhoneMobile, HiGlobeAlt, HiHeart, HiCake, HiAcademicCap } from "react-icons/hi2"
import ReviewCard from "../components/ReviewCard"
import ReviewForm from "../components/ReviewForm"
import Carousel from "../components/Carousel"
import PropTypes from "prop-types"

export default function Home({ reviews, setReviews }) {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "technology", "health", "food", "travel", "education"]
  const categoryIcons = {
    all: HiGlobeAlt,
    technology: HiDevicePhoneMobile,
    health: HiHeart,
    food: HiCake,
    travel: HiGlobeAlt,
    education: HiAcademicCap,
  }

  const filteredReviews =
    selectedCategory === "all" ? reviews : reviews.filter((r) => r.category === selectedCategory)

  const addReview = (newReview) => {
    const updatedReviews = [
      ...reviews,
      { ...newReview, id: Date.now(), comments: [], category: newReview.category },
    ]
    setReviews(updatedReviews)
    onClose()
  }

  const handleWriteReviewClick = () => {
    if (user) {
      onOpen()
    } else {
      onLoginOpen()
    }
  }

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      onLoginClose()
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  // const deleteReview = (reviewId) => {
  //   const updatedReviews = reviews.filter((review) => review.id !== reviewId)
  //   setReviews(updatedReviews)
  // }

  return (
    <Box p={4} width="80%" mx="auto">
      <Carousel />
      <Button
        colorScheme="teal"
        onClick={handleWriteReviewClick}
        mb={4}
        _hover={{ bg: "yellow.400", color: "black" }}
      >
        Write Your Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewForm addReview={addReview} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} _hover={{ bg: "pink.400", color: "black" }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Login modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Please log in to write a review.</Text>
            <Button
              colorScheme="purple"
              onClick={loginWithGoogle}
              mb={4}
              _hover={{ bg: "pink.500", color: "black" }}
            >
              Login with Google
            </Button>
            <Text fontSize="sm" color="gray.500">
              More login methods coming soon!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Reviews */}
      <Heading my={4}>Explore Honey Picks</Heading>
      <Text fontSize="lg" mb={4}>
        Browse by category and we will help you find the best reviews
      </Text>
      <Wrap spacing={4} justify="center" mb={4}>
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.toLowerCase()] || HiGlobeAlt
          return (
            <WrapItem key={category}>
              <Button
                variant="solid"
                colorScheme="purple"
                onClick={() => setSelectedCategory(category)}
                isActive={selectedCategory === category}
                _hover={{ bg: "pink.400", color: "black" }}
                _active={{ bg: "yellow.500", color: "black" }}
              >
                <IconComponent size={24} />
                <Text m={2} fontSize="sm">
                  {category.toUpperCase()}
                </Text>
              </Button>
            </WrapItem>
          )
        })}
      </Wrap>

      <Text fontSize="xl" fontWeight="bold">
        {selectedCategory === "all"
          ? "Recent Reviews"
          : `Reviews in ${selectedCategory.toUpperCase()}`}
      </Text>
      <Flex wrap="wrap" justify="space-between" gap={4}>
        {filteredReviews.map((review) => (
          <Box key={review.id} flexBasis={["100%", "100%", "30%"]}>
            <ReviewCard review={review} />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

Home.propTypes = {
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
  setReviews: PropTypes.func.isRequired,
}
