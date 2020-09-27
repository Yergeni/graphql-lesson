import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

// GraphQL
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http"; // connect the client to an specific the enpoint conection
import { InMemoryCache } from "apollo-cache-inmemory"; // To use the apollo cache
import { ApolloClient } from "apollo-boost";

import "./index.css";
import App from "./App";
import { resolvers, typeDefs } from "./graphql/resolvers";


// Connection to the backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

// Cache
const cache = new InMemoryCache();

// Apollo client
const client = new ApolloClient({
  link: httpLink,
  cache, // it refers to the previous create cache property
  typeDefs: typeDefs,
  resolvers: resolvers
});

// Apollo GraphQL cache initial state
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
})

// Checking apollo configuration
// client
//   .query({
//     query: gql`
//       {
//         getCollectionsByTitle(title: "hats") {
//           title
//           items {
//             id
//             name
//             price
//             imageUrl
//           }
//         }
//       }
//     `,
//   })
//   .then((response) => console.log(JSON.stringify(response, null, 2)));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
