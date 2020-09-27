// Resolvers will handle what to update/delete based on what the client (frontend) wants to mutate
import { gql } from "apollo-boost";

import { addItemToCart, getCartItemCount } from "./cart.utils";

// Declaring the mutation type
// NOTE: The actual Item type is extended and added a new property quantity
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

// Queries to read from the cache the actual values
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
  {
    itemCount @client
  }
`;

// The Mutations to be used in our components
export const resolvers = {
  Mutation: {
    // Toggle cart hidden implementation
    toggleCartHidden: (_root, args, { cache }) => {
      // gets the value from the client (apollo cache in frontend)
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      // change the value in the cache
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    // Add item to cart implementation. The args here has been destructure for the item to be passed
    addItemToCart: (_root, { item }, { cache }) => {
      // get the items in the cart
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      // Add the new item
      const newCartItems = addItemToCart(cartItems, item);

      // Get the number of item in the cart
      cache.writeQuery({
        query: GET_CART_ITEMS_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      // Make the changes on the Apollo cache (client)
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems; // return the cart items after added the new item
    },
  },
};
