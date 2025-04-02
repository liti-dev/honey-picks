import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    yellow: {
      400: "#faf2b5",
      500: "#f0d200",
      600: "#e6c300",
    },
    purple: {
      400: "#b794f4",
      500: "#805ad5",
      600: "#6b46c1",
    },
    pink: {
      400: "#fbd3e9",
      500: "#f687b3",
      600: "#ed64a6",
    },
    teal: {
      400: "#81e6d9",
      500: "#38b2ac",
      600: "#319795",
    },
    black: {
      400: "#2d3748",
      500: "#1a202c",
      600: "#171923",
    },
  },
})

export default theme
