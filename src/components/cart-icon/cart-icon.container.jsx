import React from "react";
// import { Mutation, Query } from "react-apollo";
import { flowRight } from "lodash";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";

// use the mutation created in the resolvers.js
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
  {
    itemCount @client
  }
`;

// The props coming from wrapping in a HOC like using the 'flowRigth' component
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
  // console.log(itemCount, toggleCartHidden);
  return (
    // <Query query={GET_CART_ITEMS_COUNT}>
    //   {/* Get the data from the query and wrap the Mutation with it */}
    //   {({ data: { itemCount } }) => (
    //     <Mutation mutation={TOGGLE_CART_HIDDEN}>
    //       {(toggleCartHidden) => (
    //         <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
    //       )}
    //     </Mutation>
    //   )}
    // </Query>

    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
  );
};

// bind as HOC the queries and mutations using 'flowRight'
export default flowRight(
  graphql(GET_CART_ITEMS_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: "toggleCartHidden" })
)(CartIconContainer);
