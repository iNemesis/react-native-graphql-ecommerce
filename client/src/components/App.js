import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './Header/Header';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import Login from "./Checkout/Login";
import Checkout from "./Checkout/Checkout";

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const isAuthenticated = sessionStorage.getItem('token');

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, {headers}) => {
    const token = isAuthenticated;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
    <>
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <AppWrapper>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Products}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/checkout' render=
                        {props =>
                            isAuthenticated
                                ? <Checkout/>
                                : <Redirect to='/login' />
                        } />
                    <Route path='/login' component={Login} />
                </Switch>
            </AppWrapper>
        </ApolloProvider>
    </>
);

export default App;
