import React from 'react';
import {ADD_TO_CART, GET_CART, GET_CART_TOTAL} from "../../constants";
import Button from "../Button/Button";
import {Mutation} from "@apollo/client/react/components";

export const AddToCartButton = ({ productId }) => {
    return (
        <Mutation mutation={ADD_TO_CART} refetchQueries={[{ query: GET_CART }, { query: GET_CART_TOTAL }]}>
            {addToCart => (
                <Button onClick={() => addToCart({variables: { productId }})}>
                    {`+ Add to cart`}
                </Button>
            )}
        </Mutation>
    )
};
