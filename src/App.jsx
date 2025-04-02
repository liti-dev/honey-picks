import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AuthProvider } from "./AuthContext"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PageNotFound from "./pages/PageNotFound"
import ReviewDetails from "./components/ReviewDetails"
import { reviews as initialReviews } from "./data.js"

export default function App() {
  const [reviews, setReviews] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("reviews")
    return saved ? JSON.parse(saved).map((review) => ({ ...review })) : initialReviews
  })

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home reviews={reviews} setReviews={setReviews} />} />
          <Route path="/review/:id" element={<ReviewDetails reviews={reviews} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}
