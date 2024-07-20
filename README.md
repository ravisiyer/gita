This Gita app has been developed on top of [Very Simple Gita](https://github.com/ravisiyer/verysimplegita) which is a very simple but functional, open-source freeware, Bhagavad Gita web app.

I have changed the User Interface (UI) of this app to a regular web app UI. But, from a source code point of view, it no longer is a very simple Gita app. Students and other learners may want to first go through the source code of Very Simple Gita app before going through this app's source code.

This Gita app uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint: https://gql.bhagavadgita.io/graphql (Explorer: https://gql.bhagavadgita.io/graphiql), and displays it on browser. It also uses Tailwind CSS and TypeScript.

This Gita app is open-source and shared under free-software MIT license.

Note that there seems to be a problem with the data associated with commentaries of Swami Sivananda and some others. Question mark character (?) appears frequently in places where I think there should be a comma character (,). I have raised the [issue on the GitHub repository associated with the GraphQL endpoint](https://github.com/gita/bhagavad-gita-graphql/issues/2). As a temporary measure (hack), in the Verse page which is the only page which shows commentaries, I am replacing ? character with , character in all commentaries data retrieved from the data source. The disadvantage is that even ? characters that should be ? will be changed to , characters. But such cases may be very few.

For more about this program, please visit [Gita App v1.0 (Open Source), Pathway to Self-Learn Next.js Web Dev with Tailwind CSS and TypeScript](https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html).
