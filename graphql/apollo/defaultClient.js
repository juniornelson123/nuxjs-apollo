import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'

import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import ApolloLogger from './ApolloLogger'
import { hasSubscription } from "@jumpn/utils-graphql";

function createLink() {
  const uri = "http://localhost:4000/api"
  const wsUri = "ws://localhost:4000/socket"

  if (process.browser) {
    return createAbsintheSocketLink(AbsintheSocket.create(
      new PhoenixSocket(wsUri)
    ))
  }

  return new HttpLink({
    uri,
    credentials: "same-origin"
  })
}

export default function (ctx) {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/api",
    credentials: 'same-origin',
  })


  const authLink = setContext((_, { headers }) => {
    const token = ""
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  const loggerLink = process.env.NODE_ENV !== 'production' ? [new ApolloLogger()] : []

  const link = new ApolloLink.split(
    operation => hasSubscription(operation.query),
    authLink.concat(createLink()),
    authLink.concat(httpLink)
  );

  return {
    // link: ApolloLink.from([...loggerLink, authLink, httpLink]),
    link: link,
    // httpEndpoint: 'http://localhost:4000/api',
    getAuth: () => 'Bearer my-static-token' // use this method to overwrite functions
  }
}
