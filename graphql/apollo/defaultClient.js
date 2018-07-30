import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { parse } from 'cookie'
import ApolloLogger from './ApolloLogger'

// export default ctx => {

//   const httpLink = new HttpLink({
//     uri: "http://localhost:4000/api",
//     credentials: 'same-origin',
//   })



//   return {
//     link: httpLink,
//     cache: new InMemoryCache(),
//   }
// }


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

  return {
    link: ApolloLink.from([...loggerLink, authLink, httpLink]),
    // httpEndpoint: 'http://localhost:4000/api',
    getAuth: () => 'Bearer my-static-token' // use this method to overwrite functions
  }
}
