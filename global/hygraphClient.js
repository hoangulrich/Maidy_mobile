// ApolloClientSetup.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://us-west-2.cdn.hygraph.com/content/cm1wk862k02oe07w2htxbbomk/master",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
