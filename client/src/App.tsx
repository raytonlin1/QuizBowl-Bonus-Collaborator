import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Auth from "./components/auth/Auth";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";

const darkTheme = createTheme({
  palette: {mode: 'dark'}
})

const App = () => {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Container>
      <RouterProvider router = {router}/>
    </Container>
  </ThemeProvider>
};

export default App;