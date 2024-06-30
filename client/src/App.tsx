import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Auth from "./components/auth/Auth";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client"
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";

// We use Apollo client state management library for GraphQL queries
const darkTheme = createTheme({
  palette: {mode: 'dark'}
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container>
        <Guard>
          <RouterProvider router = {router}/>
        </Guard>
      </Container>
    </ThemeProvider>
    </ApolloProvider>
  )
};

export default App;