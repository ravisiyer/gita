import { Metadata } from "next";
import { GRAPHQL_URI, GRAPHQL_EXPLORER_URI } from "@/app/constants";

export const metadata: Metadata = {
  title: "Question Mark Character Issue",
};

function Page() {
  return (
    <div>
      <h2 className="my-5 text-2xl font-bold">
        Question Mark Character Issue For Some Commentaries Data
      </h2>
      <p className="my-4">
        Note that there seems to be a problem with the data associated with
        commentaries of Swami Sivananda and some others. Question mark character
        (?) appears frequently in places where I think there should be a comma
        character (,). Chapter 13, verse 34 has this issue in some commentaries
        in English and Hindi and possibly some in Sanskrit.
      </p>
      <p className="my-4">
        The data source is a GraphQL endpoint: {GRAPHQL_URI} (GraphQL Explorer:{" "}
        <a
          href={GRAPHQL_EXPLORER_URI}
          className="text-blue-700 visited:text-purple-900 underline"
        >
          {GRAPHQL_EXPLORER_URI}
        </a>
        )
      </p>
      <p>
        I have raised{" "}
        <a
          href="https://github.com/gita/bhagavad-gita-graphql/issues/2"
          className="text-blue-700 visited:text-purple-900 underline"
        >
          the issue on the GitHub repository associated with the GraphQL
          endpoint
        </a>
        .
      </p>
      <p className="my-4">
        I do not control the data source. So I am not in a position to
        investigate and fix the data problem.
      </p>
      <p className="my-4">
        As a temporary measure (hack), in the Verse page which is the only page
        which shows commentaries, I am replacing ? character with , character in
        all commentaries data retrieved from the data source. The disadvantage
        is that even ? characters that should be ? will be changed to ,
        characters. But such cases may be very few.
      </p>
    </div>
  );
}
export default Page;
