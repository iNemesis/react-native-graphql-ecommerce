import React from 'react';
import Button from '../Button/Button';
import {Query} from "@apollo/client/react/components";
import {GET_CART_TOTAL} from "../../constants";

const CartButton = ({ onClick }) => (
    <Query query={GET_CART_TOTAL}>
        {({data, loading, error}) => (
            <Button onClick={onClick}>{`Cart (${(loading || error) || !data ? 0 : data.cart.total})`}</Button>
        )}
    </Query>
);

export default CartButton;
