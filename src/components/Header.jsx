import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAuth } from "../AuthContext"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase"

const Header = () => {
  const { user, logout } = useAuth()
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    <Box
      as="header"
      bg="pink.400"
      color="white"
      py={4}
      px={8}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center" justify="space-between" maxW="6xl" mx="auto">
        <Link to="/">
          <Flex align="center">
            <Image src="/logo.png" alt="Honey Pick Logo" boxSize={10} mr={4} />
            <Heading size="lg" color="black.500">
              Honey Picks
            </Heading>
          </Flex>
        </Link>

        {user ? (
          <Flex align="center" gap={4}>
            <Text color="black.500">{user.displayName}</Text>
            <Button colorScheme="purple" onClick={logout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Button colorScheme="purple" onClick={loginWithGoogle} _hover={{ bg: "pink.500" }}>
            Login with Google
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Header
