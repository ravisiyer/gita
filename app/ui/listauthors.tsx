import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "../lib/gqltypes-d";

export default function ListAuthors({
  languageId,
}: {
  languageId: GitaAuthor["id"] | undefined;
}) {
  let numCommentators = 0;
  let numTranslators = 0;
  let commentatorNames = Array(0);
  let translatorNames = Array(0);
  const matchedEntry = allAuthorsByLanguageId.find((entry) => {
    return entry.languageId === languageId;
  });
  matchedEntry &&
    matchedEntry.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
      if (gitaAuthor?.gitaCommentariesByAuthorId?.totalCount) {
        commentatorNames.push(gitaAuthor.name);
        numCommentators++;
      }
      if (gitaAuthor?.gitaTranslationsByAuthorId?.totalCount) {
        translatorNames.push(gitaAuthor.name);
        numTranslators++;
      }
    });
  return (
    <div className="text-base font-normal">
      {translatorNames.length ? (
        <p className="ml-12 font-bold">Translators</p>
      ) : null}
      {translatorNames.map((name, index) => {
        return (
          <p className="ml-14 line-clamp-1" key={`Transl${index}`}>
            {/* Below code could be made an ordered list. But I wanted to check this out. */}
            <span className="min-w-6 inline-block">{`${index + 1}. `}</span>
            {`${name}`}
          </p>
        );
      })}
      {commentatorNames.length ? (
        <p className="ml-12 font-bold">Commentators</p>
      ) : null}
      {commentatorNames.map((name, index) => {
        return (
          <p className="ml-14 line-clamp-1" key={`Comment${index}`}>
            {/* Below code could be made an ordered list. But I wanted to check this out. */}
            <span className="min-w-6 inline-block">{`${index + 1}. `}</span>
            {`${name}`}
          </p>
        );
      })}
    </div>
  );
}
