import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";

// First define the query with the expected param type
// Second call the query with the param
const GET_COLLETION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query query={GET_COLLETION_BY_TITLE} variables={{title: match.params.collectionId}}>
    {
      ({ loading, data }) => {
        if (loading) return <Spinner />;
        const { getCollectionsByTitle } = data; // destructuring the getCollectionsByTitle from data
        return <CollectionPage collection={getCollectionsByTitle} />;
      }
    }
  </Query>
);

export default CollectionPageContainer;
