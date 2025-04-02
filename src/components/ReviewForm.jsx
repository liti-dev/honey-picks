import React, { useState } from "react"
import PropTypes from "prop-types"
import { Box, Button, Select, Input, Textarea } from "@chakra-ui/react"

const ReviewForm = ({ addReview }) => {
  const [newReview, setNewReview] = useState({ title: "", rating: "", text: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("New Review:", newReview)
    addReview({ ...newReview, id: Date.now(), rating: Number(newReview.rating) })
    setNewReview({ title: "", rating: "", text: "", imgurl: "" })
  }

  return (
    <Box as="form" onSubmit={handleSubmit} mt={4}>
      <Input
        required
        placeholder="Title"
        value={newReview.title}
        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
        mb={2}
      />
      <Select
        required
        placeholder="Select Category"
        value={newReview.category}
        onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
        mb={2}
      >
        <option value="technology">Technology</option>
        <option value="health">Health</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="education">Education</option>
      </Select>
      <Input
        required
        type="number"
        placeholder="Rating (1-5)"
        value={newReview.rating}
        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
        mb={2}
      />
      <Textarea
        required
        placeholder="Review"
        value={newReview.text}
        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
        mb={2}
      />
      <Input
        placeholder="Image URL"
        value={newReview.imgurl}
        onChange={(e) => setNewReview({ ...newReview, imgurl: e.target.value })}
        mb={2}
      />
      <Button type="submit" colorScheme="purple" _hover={{ bg: "pink.400", color: "black" }}>
        Submit
      </Button>
    </Box>
  )
}

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired,
}

export default ReviewForm
