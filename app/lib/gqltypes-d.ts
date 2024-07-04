/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any };
  /** The day, does not include a time. */
  Date: { input: any; output: any };
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any };
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["Cursor"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["Cursor"]["output"]>;
};

/** A connection to a list of `GitaCommentary` values. */
export type GitaCommentariesConnection = {
  __typename?: "GitaCommentariesConnection";
  /** A list of edges which contains the `GitaCommentary` and cursor to aid in pagination. */
  edges: Array<GitaCommentariesEdge>;
  /** A list of `GitaCommentary` objects. */
  nodes: Array<Maybe<GitaCommentary>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GitaCommentary` you could get from the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** A `GitaCommentary` edge in the connection. */
export type GitaCommentariesEdge = {
  __typename?: "GitaCommentariesEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]["output"]>;
  /** The `GitaCommentary` at the end of the edge. */
  node?: Maybe<GitaCommentary>;
};

export type GitaCommentary = Node & {
  __typename?: "GitaCommentary";
  authorId?: Maybe<Scalars["Int"]["output"]>;
  authorName?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  /** Reads a single `GitaAuthor` that is related to this `GitaCommentary`. */
  gitaAuthorByAuthorId?: Maybe<GitaAuthor>;
  /** Reads a single `GitaLanguage` that is related to this `GitaCommentary`. */
  gitaLanguageByLanguageId?: Maybe<GitaLanguage>;
  /** Reads a single `GitaVerse` that is related to this `GitaCommentary`. */
  gitaVerseByVerseId?: Maybe<GitaVerse>;
  id: Scalars["Int"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  languageId?: Maybe<Scalars["Int"]["output"]>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
  verseId?: Maybe<Scalars["Int"]["output"]>;
};

/** A connection to a list of `GitaTranslation` values. */
export type GitaTranslationsConnection = {
  __typename?: "GitaTranslationsConnection";
  /** A list of edges which contains the `GitaTranslation` and cursor to aid in pagination. */
  edges: Array<GitaTranslationsEdge>;
  /** A list of `GitaTranslation` objects. */
  nodes: Array<Maybe<GitaTranslation>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GitaTranslation` you could get from the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** A `GitaTranslation` edge in the connection. */
export type GitaTranslationsEdge = {
  __typename?: "GitaTranslationsEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]["output"]>;
  /** The `GitaTranslation` at the end of the edge. */
  node?: Maybe<GitaTranslation>;
};

export type GitaTranslation = Node & {
  __typename?: "GitaTranslation";
  authorId?: Maybe<Scalars["Int"]["output"]>;
  authorName?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  /** Reads a single `GitaAuthor` that is related to this `GitaTranslation`. */
  gitaAuthorByAuthorId?: Maybe<GitaAuthor>;
  /** Reads a single `GitaLanguage` that is related to this `GitaTranslation`. */
  gitaLanguageByLanguageId?: Maybe<GitaLanguage>;
  /** Reads a single `GitaVerse` that is related to this `GitaTranslation`. */
  gitaVerseByVerseId?: Maybe<GitaVerse>;
  id: Scalars["Int"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  languageId?: Maybe<Scalars["Int"]["output"]>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
  verseId?: Maybe<Scalars["Int"]["output"]>;
};

export type GitaAuthor = Node & {
  __typename?: "GitaAuthor";
  /** Reads and enables pagination through a set of `GitaCommentary`. */
  gitaCommentariesByAuthorId: GitaCommentariesConnection;
  /** Reads and enables pagination through a set of `GitaTranslation`. */
  gitaTranslationsByAuthorId: GitaTranslationsConnection;
  id: Scalars["Int"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
};

export type GitaLanguage = Node & {
  __typename?: "GitaLanguage";
  /** Reads and enables pagination through a set of `GitaCommentary`. */
  gitaCommentariesByLanguageId: GitaCommentariesConnection;
  /** Reads and enables pagination through a set of `GitaTranslation`. */
  gitaTranslationsByLanguageId: GitaTranslationsConnection;
  id: Scalars["Int"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
};

export type GitaVerse = Node & {
  __typename?: "GitaVerse";
  chapterId?: Maybe<Scalars["Int"]["output"]>;
  chapterNumber?: Maybe<Scalars["Int"]["output"]>;
  /** Reads a single `GitaChapter` that is related to this `GitaVerse`. */
  gitaChapterByChapterId?: Maybe<GitaChapter>;
  /** Reads and enables pagination through a set of `GitaCommentary`. */
  gitaCommentariesByVerseId: GitaCommentariesConnection;
  /** Reads and enables pagination through a set of `GitaTranslation`. */
  gitaTranslationsByVerseId: GitaTranslationsConnection;
  id: Scalars["Int"]["output"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
  slug?: Maybe<Scalars["String"]["output"]>;
  text?: Maybe<Scalars["String"]["output"]>;
  transliteration?: Maybe<Scalars["String"]["output"]>;
  verseNumber?: Maybe<Scalars["Int"]["output"]>;
  wordMeanings?: Maybe<Scalars["String"]["output"]>;
};

/** A connection to a list of `GitaVerse` values. */
export type GitaVersesConnection = {
  __typename?: "GitaVersesConnection";
  /** A list of edges which contains the `GitaVerse` and cursor to aid in pagination. */
  edges: Array<GitaVersesEdge>;
  /** A list of `GitaVerse` objects. */
  nodes: Array<Maybe<GitaVerse>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GitaVerse` you could get from the connection. */
  totalCount: Scalars["Int"]["output"];
};

/** A `GitaVerse` edge in the connection. */
export type GitaVersesEdge = {
  __typename?: "GitaVersesEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]["output"]>;
  /** The `GitaVerse` at the end of the edge. */
  node?: Maybe<GitaVerse>;
};

export type GitaChapter = Node & {
  __typename?: "GitaChapter";
  chapterNumber?: Maybe<Scalars["Int"]["output"]>;
  chapterSummary?: Maybe<Scalars["String"]["output"]>;
  chapterSummaryHindi?: Maybe<Scalars["String"]["output"]>;
  /** Reads and enables pagination through a set of `GitaVerse`. */
  gitaVersesByChapterId: GitaVersesConnection;
  id: Scalars["Int"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  nameMeaning?: Maybe<Scalars["String"]["output"]>;
  nameTranslated?: Maybe<Scalars["String"]["output"]>;
  nameTransliterated?: Maybe<Scalars["String"]["output"]>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"]["output"];
  slug?: Maybe<Scalars["String"]["output"]>;
  versesCount?: Maybe<Scalars["Int"]["output"]>;
};
