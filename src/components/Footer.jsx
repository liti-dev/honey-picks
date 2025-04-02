import { Box, Text, Flex } from "@chakra-ui/react"
import { WebsiteCarbonBadge } from "react-websitecarbon-badge"

const Footer = () => {
  return (
    <Box as="footer" bg="pink.400" color="black.500" fontWeight="bold" py={4} px={8} mt={8}>
      <Flex justify="center" align="center" direction="column">
        <Text fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} Honey Picks. All rights reserved.
        </Text>
        <Text fontSize="xs" mt={2} textAlign="center">
          Built with ❤️ by Tia Nguyen
        </Text>
        <WebsiteCarbonBadge url="https://honey-picks.vercel.app/" co2="0.10" percentage="90" />
      </Flex>
    </Box>
  )
}

export default Footer
