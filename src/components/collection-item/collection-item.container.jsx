import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionItem from "./collection-item.component";

// use the mutation created in the resolvers.js
const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

// This container is called from collection preview which is passing the item as props
const CollectionItemContainer = (props) => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {/* spreed the comming props to the collection item. Then pass the mutation with dynamic variable */}
    {(addItemToCart) => (
      <CollectionItem
        {...props}
        addItem={(item) => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default CollectionItemContainer;
