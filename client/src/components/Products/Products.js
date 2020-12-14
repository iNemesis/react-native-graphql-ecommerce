import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
query getProducts {
  products {
    id
    title
    thumbnail
  }
}
`;

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Products = ({ history }) => {
    const {data, loading, error } = useQuery(GET_PRODUCTS);
  return (
    <>
      {history && (
        <SubHeader
          title='Available products'
          goToCart={() => history.push('/cart')}
        />
      )}
    {(loading || error) && <Alert>{loading ? 'Loading...': error}</Alert>}
        {data && (<ProductItemsWrapper>
            {data.products &&
            data.products.map(product => (
                <ProductItem key={product.id} data={product} />
            ))}
        </ProductItemsWrapper>)}
    </>
  );
};

Products.defaultProps = {
  loading: false,
  error: '',
  products: [],
};

export default Products;
