import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import * as ReactDOM from "react-dom/client"
import App from "./App"
import theme from "./theme"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
