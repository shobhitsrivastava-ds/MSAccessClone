import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}


// totalOptions = [
//   [
//     {name: 'profession', value: '1', checked: false},
//     {name: 'name', value: '2', checked: false},
//     {name: 'patient', value: '3', checked: false}
//   ],
//   [
//     {name: 'name', value: '4', checked: false},
//     {name: 'disease', value: '5', checked: false},
//     {name: 'provider', value: '6', checked: false}
//   ],
//   [
//     {name: 'claimId', value: '7', checked: false},
//     {name: 'amount', value: '8', checked: false},
//     {name: 'status', value: '9', checked: false}
//   ]
// ]

