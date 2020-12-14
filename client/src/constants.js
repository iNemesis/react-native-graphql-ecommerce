import { gql } from "@apollo/client";

export const GET_CART_TOTAL = gql`
    query getCartTotal {
        cart {
            total
        }
    }
`;

export const GET_CART = gql`
  query getCart {
    cart {
      total
      products {
        id
        title
        thumbnail
      }
    }
  }
`;

export const ADD_TO_CART = gql`
    mutation addToCart($productId: Int!) {
        addToCart(input: {productId: $productId}) {
            total
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($userName: String!, $password: String!) {
        loginUser(userName: $userName, password: $password) {
            userName
            token
        }
    }
`;

export const COMPLETE_CART = gql`
    mutation completeCart {
        completeCart {
            complete
        }
    }
`;
