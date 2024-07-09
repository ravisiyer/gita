This app. is being developed on top of [Very Simple Gita](https://github.com/ravisiyer/verysimplegita) which is a very simple but functional, open-source freeware, Bhagavad Gita web app.

In this app, I am using Tailwind CSS and TypeScript. I have changed the navigation bar to a regular web app UI. But, from a source code point of view, it no longer is a very simple gita app.

The app uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint: https://gql.bhagavadgita.io/graphql (Explorer: https://gql.bhagavadgita.io/graphiql), and displays it on browser. It is shared under free-software MIT license.

Note that there seems to be a problem with the data associated with Swami Sivananda commentaries. Question mark character (?) appears frequently in places where I think there should be a comma character (,). I have raised the [issue on the GitHub repository associated with the GraphQL endpoint](https://github.com/gita/bhagavad-gita-graphql/issues/2).
