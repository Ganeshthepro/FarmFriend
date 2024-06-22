import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-image: url("https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 2rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%; /* Adjusted */
    max-height: 100%; /* Adjusted */
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%; /* Adjusted */
      max-height: 100%; /* Adjusted */
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

 // ...

 return (
  <Bg>
    <Center>
      <ColumnsWrapper>
        <Column>
          <div>
            {/* Using optional chaining */}
            <Title>{product?.title}</Title>
            <Desc>{product?.description}</Desc>

            {/* Or conditional rendering */}
            {product && (
              <>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
              </>
            )}

            <ButtonsWrapper>
              {product && (
                <ButtonLink href={`/product/${product._id}`} outline white size="l">
                  Read more
                </ButtonLink>
              )}
              <Button white onClick={addFeaturedToCart} primary size="l">
                <CartIcon /> Add To Cart
              </Button>
            </ButtonsWrapper>
          </div>
        </Column>
        <Column>
          <img src="https://epic-ecomadmin.s3.amazonaws.com/1713887606198.jpeg" alt="Product Image" />
        </Column>
      </ColumnsWrapper>
    </Center>
  </Bg>
);
}
