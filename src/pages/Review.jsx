// filepath: e:\Personal project\honey-pick\src\pages\Review.jsx
import React from "react"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import ReviewDetails from "../components/ReviewDetails"

const Review = ({ reviews = [] }) => {
  const { id } = useParams()
  const review = reviews.find((review) => review.id === parseInt(id))

  if (!review) {
    return <div>Review not found</div>
  }

  return (
    <div>
      <ReviewDetails reviews={reviews} />
    </div>
  )
}

Review.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      imgurl: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
}

export default Review
