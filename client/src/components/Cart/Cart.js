import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
import Totals from './Totals';
import {useQuery} from "@apollo/client";
import {GET_CART} from "../../constants";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Cart = ({ history, match }) => {
  const {data, loading, error} = useQuery(GET_CART);
  return (
      <>
        {history && (
            <SubHeader title='Cart' goToCart={() => history.push('/cart')}/>
        )}
        {!loading && !error ? (
            <CartWrapper>
              <CartItemsWrapper>
                {data.cart &&
                data.cart.products.map(product => (
                    <ProductItem key={product.id} data={product}/>
                ))}
              </CartItemsWrapper>
              <Totals count={data.cart.total}/>
              {data.cart && data.cart.products.length > 0 && (
                  <Link to='/checkout'>
                    <Button color='royalBlue'>Checkout</Button>
                  </Link>
              )}
            </CartWrapper>
        ) : (
            <Alert>{loading ? 'Loading...' : error}</Alert>
        )}
      </>
  )
};

Cart.defaultProps = {
  cart: {
    products: [],
    total: 0,
  },
};

export default Cart;
