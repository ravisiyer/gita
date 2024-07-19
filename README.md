This app has been developed on top of [Very Simple Gita](https://github.com/ravisiyer/verysimplegita) which is a very simple but functional, open-source freeware, Bhagavad Gita web app.

I have changed the User Interface (UI) of this app to a regular web app UI. But, from a source code point of view, it no longer is a very simple Gita app. Students and other learners may want to first go through the source code of Very Simple Gita app before going through this app's source code.

The app uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint: https://gql.bhagavadgita.io/graphql (Explorer: https://gql.bhagavadgita.io/graphiql), and displays it on browser. In this app, I am using Tailwind CSS and TypeScript. The app is shared under free-software MIT license.

Note that there seems to be a problem with the data associated with Swami Sivananda and some other commentaries. Question mark character (?) appears frequently in places where I think there should be a comma character (,). I have raised the [issue on the GitHub repository associated with the GraphQL endpoint](https://github.com/gita/bhagavad-gita-graphql/issues/2). As a temporary measure, I am replacing ? characters with , characters in all commentaries. Disadvantage is that even ? chars that should be ? will be changed to , chars. But such cases may be very few.
