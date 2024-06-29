import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants";

function Page() {
  return (
    <div>
      <h1>About App & Data</h1>
      <p>
        This is a very simple but functional, open-source freeware, Bhagavad
        Gita web app I wrote recently. It uses Next.js and Apollo Client to
        retrieve Bhagavad Gita chapters and verses data from a GraphQL endpoint,
        and displays it on browser. It is shared under free-software MIT
        license.
      </p>
      <p>
        Data source (GraphQL endpoint): {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a href={GRAPHQL_EXPLORER_URI}>{GRAPHQL_EXPLORER_URI}</a>)
      </p>
      <p>
        I have deliberately kept this version very simple. I saw some
        open-source Gita apps using Next.js but their code was quite involved. I
        wanted to see whether one can write very simple Hindu scripture viewer
        web apps using current Next.js framework without too much code and
        coding complexity, provided scripture content was available through an
        API. Note that using current Next.js framework may provide performance
        benefits for the web app.
      </p>
      <p>
        More about this app can be read in{" "}
        <a href="https://raviswdev.blogspot.com/2024/05/notes-on-my-very-simple-bhagavad-gita.html">
          this associated blog post
        </a>
        .
      </p>
      <p>
        App GitHub{" "}
        <a href="https://github.com/ravisiyer/verysimplegita">repository</a> and
        associated{" "}
        <a href="https://github.com/ravisiyer/verysimplegita/blob/main/README.md">
          README
        </a>
        .
      </p>
      <p>
        App version: 2.0, Date: 4th June 2024
        <br />
        App author: Ravi S. Iyer
      </p>
    </div>
  );
}
export default Page;
