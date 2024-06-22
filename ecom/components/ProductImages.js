import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20px 0;

  @media (min-width: 1024px) {
    padding: 30px 0;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  font-size: 2rem;

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navlink = styled(Link)`
  display: flex;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;

  @media (min-width: 1024px) {
    padding: 0 20px;
    font-size: 2rem;
  }
`;

const StyledNav = styled.nav`
  display: ${(props) => (props.mobileNavActive ? `block` : `none`)};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  z-index: 9;

  @media (min-width: 1024px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 11;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <Navlink href={"/"}>Home</Navlink>
            <Navlink href={"/products"}>All Products</Navlink>
            <Navlink href={"/account"}>Account</Navlink>
            <Navlink href={"/cart"}>Cart ({cartProducts.length})</Navlink>
          </StyledNav>
          <NavButton onClick={() => setMobileActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}