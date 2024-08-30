This is a text only (without audio/video) Gita web app (Next.js, open source, freeware).

For its data, this Gita web app uses a public GraphQL endpoint: [https://gql.bhagavadgita.io/graphql](https://gql.bhagavadgita.io/graphql) ([GraphQL Explorer](https://gql.bhagavadgita.io/graphiql)), with possibly this [GitHub repository](https://github.com/gita/bhagavad-gita-graphql). I do not know how stable this data source is but for the past few months that I have been using it, it has been available all the time and been stable. This data source seems to be using a subset of data of [IIT Kanpur's Gita Super Site](https://www.gitasupersite.iitk.ac.in/srimad?language=dv&field_chapter_value=1&field_nsutra_value=1) , which publicly shares translations and commentaries of famous spiritual figures from India like [Swami Sivananda](https://en.wikipedia.org/wiki/Sivananda_Saraswati), [Swami Chinmayananda](https://en.wikipedia.org/wiki/Chinmayananda_Saraswati), [Swami Adidevananda](https://en.wikipedia.org/wiki/Swami_Adidevananda) and [Swami Gambirananda](https://en.wikipedia.org/wiki/Gambhirananda) . The Sanskrit commentaries of renowned ancient masters like Sri Shankaracharya, Sri Ramanujacharya and Sri Madhavacharya are also part of this data.

This Gita web app is able to utilize the above-mentioned awesome GraphQL data resource to show translations and commentaries of above mentioned spiritual masters and more.

This Gita web app is deployed at: [https://gita-rsi.vercel.app/](https://gita-rsi.vercel.app/) and its Github public repository is: [https://github.com/ravisiyer/gita](https://github.com/ravisiyer/gita) . As it is a responsive web app, the app is accessible from Internet browsers (like Chrome/Edge/Safari) on PC desktop/laptop, Android mobile and Apple (iphone) mobile (and tablets though I have not tested it on tablets). Please note that it is NOT a native mobile (Android/iPhone) app.

Note that open source means that anybody is free to modify it and use it. Freeware means that anybody is free to use it in whatever way they want. I am using MIT software license for this purpose.

I think this software can be modified and used for any Chapter and Verse kind of application including, say, the Bible, Upanishads or a simple collection of poems. It could even be modified and used for Period (like year) and Discourse (like various dates in a year), kind of web app.

Adaptations of my Gita app for other needs like mentioned above, will need creation of suitable GraphQL database endpoints, or adaption of the app to use other database sources (like SQL (e.g. Postgres) or NoSQL (e.g. MongoDB) databases).

Web app version: 1.4, Date: 30th August 2024

Web app author: Ravi S. Iyer

**Footnotes**

1. This Gita web app uses Next.js and Apollo Client to retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint, and displays it on browser. It also uses Tailwind CSS and TypeScript.

2. There seems to be a question mark character problem with the data associated with some commentaries for which I am providing a temporary fix in the app. More info on it is provided in a page mentioned in About page of the app.

3. An important objective of this app development has been to provide a pathway to self-learner students to follow the path I used to learn the required technologies and develop this app. I have made extensive notes about the path I used in the blog some of whose posts are mentioned below.

4. Some more info. about this web app can be read in the following blog posts, one for each release version of this app:

   [Version 1.4 (this version)](https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v14.html)

   [Version 1.3](https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v13.html)

   [Version 1.2](https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v12.html)

   [Version 1.1](https://raviswdev.blogspot.com/2024/08/added-settings-page-to-gita-web-app-to.html)

   [Version 1.0](https://raviswdev.blogspot.com/2024/07/gita-app-v10-pathway-to-self-learn.html)

5. This Gita web app has been developed on top of [Very Simple Gita](https://github.com/ravisiyer/verysimplegita) which is a very simple but functional, open-source freeware, Bhagavad Gita web app. I have changed the User Interface (UI) of this app to a regular web app UI. But, from a source code point of view, it no longer is a very simple Gita app. Students and other learners may want to first go through the source code of Very Simple Gita app before going through this app's source code.
