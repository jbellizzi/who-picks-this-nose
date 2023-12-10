import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { SERVER_URI } from "./constants";
import "./index.css";

const client = new ApolloClient({
  uri: "https://who-picks-this-nose-production.up.railway.app/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);