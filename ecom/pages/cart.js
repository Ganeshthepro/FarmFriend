import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Input from '@/components/Input';
import { useRouter } from 'next/router';

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (min-width: 1024px) {
    gap: 60px;
    margin-top: 60px;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;

  @media (min-width: 1024px) {
    padding: 40px;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;

  @media (min-width: 1024px) {
    padding: 15px 0;
  }
`;

const ProductImageBox = styled.div`
  width: 150px;
  height: 150px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  img {
    max-width: 140px;
    max-height: 140px;
  }

  @media (min-width: 768px) {
    padding: 10px;
    width: 200px;
    height: 200px;

    img {
      max-width: 180px;
      max-height: 180px;
    }
  }

  @media (min-width: 1024px) {
    width: 250px;
    height: 250px;

    img {
      max-width: 230px;
      max-height: 230px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;

  @media (min-width: 768px) {
    display: inline-block;
    padding: 0 15px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 1024px) {
    gap: 10px;
  }
`;

const OrderInfo = styled.div`
  @media (min-width: 768px) {
    max-width: 300px;
  }

  div {
    margin-bottom: 10px;
  }

  input[type="text"],
  textarea {
    height: 40px;
  }
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart, total } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPinCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(true);
      axios
        .post('/api/cart', { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setProducts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, pincode, streetAddress, country,
      cartProducts,
    });
  
    if (response.data.url) {
      // Redirect to Stripe checkout URL
      window.location = response.data.url;
    } else {
      // Redirect to Farm Friend website
      clearCart(); // Clear the cart after successful payment
      window.location.href = 'https://farm-friend-7bbz.vercel.app/';
    }
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>

            {!cartProducts?.length && !loading && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter((id) => id === product._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter((id) => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {loading && <div>Loading...</div>}
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <OrderInfo>
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div>
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Pin Code"
                      value={pincode}
                      name="pincode"
                      onChange={(ev) => setPinCode(ev.target.value)}
                    />
                  </CityHolder>
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                </div>
              </OrderInfo>
              <Button black block onClick={goToPayment} primary>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
};

export default CartPage;