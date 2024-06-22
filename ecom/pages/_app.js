import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Roboto";
    src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
    font-weight: 500;
    font-style: italic;
  }

  * {
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }

  body {
    background-color: #eee;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles /> 
      <CartContextProvider>
      <Component {...pageProps} />

      </CartContextProvider>
      
    </>
  );
}
