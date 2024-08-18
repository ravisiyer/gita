**README update for [Version 1.3](https://github.com/ravisiyer/gita/releases/tag/v1.3)**

This version adds to the Settings feature of earlier [version 1.2](https://github.com/ravisiyer/gita/releases/tag/v1.2), the ability of selecting translator for chapter page, use or not use the replace question mark (?) by comma (,) fix for commentaries data, selecting languages for chapter summaries and whether full window width should be used by all app pages for large window width devices like PC or laptop. It also uses higher resolution hero images (for home page).

**README update for [Version 1.2](https://github.com/ravisiyer/gita/releases/tag/v1.2)**

This version adds to the Settings feature of earlier version 1.1, the ability of selecting individual translators and commentators within each language, whose translations and commentaries are shown in verse page. In version 1.1, only languages could be selected and all translations and commentaries of selected languages were shown in verse page.

**README update for Version 1.1**

This version adds to earlier [version 1.0](https://github.com/ravisiyer/gita/releases/tag/v1.0), the feature of user selecting the languages of translations and commentaries in verse page through a 'Settings' page.

**README of [Version 1.0](https://github.com/ravisiyer/gita/releases/tag/v1.0)**

This Gita web app has been developed on top of [Very Simple Gita](https://github.com/ravisiyer/verysimplegita) which is a very simple but functional, open-source freeware, Bhagavad Gita web app.

I have changed the User Interface (UI) of this app to a regular web app UI. But, from a source code point of view, it no longer is a very simple Gita app. Students and other learners may want to first go through the source code of Very Simple Gita app before going through this app's source code.

This Gita web app uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint: https://gql.bhagavadgita.io/graphql (Explorer: https://gql.bhagavadgita.io/graphiql), and displays it on browser. It also uses Tailwind CSS and TypeScript.

This Gita web app is open-source and shared under free-software MIT license.

Note that there seems to be a problem with the data associated with commentaries of Swami Sivananda and some others. Question mark character (?) appears frequently in places where I think there should be a comma character (,). I have raised the [issue on the GitHub repository associated with the GraphQL endpoint](https://github.com/gita/bhagavad-gita-graphql/issues/2). As a temporary measure (hack), in the Verse page which is the only page which shows commentaries, I am replacing ? character with , character in all commentaries data retrieved from the data source. The disadvantage is that even ? characters that should be ? will be changed to , characters. But such cases may be very few.

For more about this program, please visit [Gita Web App v1.0 (Open Source), Pathway to Self-Learn Next.js Web Dev with Tailwind CSS and TypeScript](https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html).
