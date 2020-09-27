import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

// use the mutation created in the resolvers.js
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CartDropdownContainer = () => (
  // Wrapping the component so it gets the two functionalities 'cartItems' and 'toggleCartHidden'
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => (
      <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
          <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden} />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropdownContainer;
