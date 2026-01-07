import { GitaChapter } from "./gqltypes-d";
import { calcNumericVerseId, getCVNumbersFromVerseId } from "./util";

// data-rest.ts
const REST_BASE = "https://vedicscriptures.github.io";
const REST_NEW_BASE = "https://ravisiyer.github.io/gita-data/v1";

/**
 * Fetches the chapters list from vedicscriptures.github.io and
 * returns it in the same shape your frontend expects.
 */
export async function getAllChapters() {
  try {
    const apiurl = `${REST_NEW_BASE}/chapters.json`;
    const res = await fetch(apiurl);
    const apiChapters = await res.json();

    const nodes: GitaChapter[] = apiChapters.map((c: any) => ({
      __typename: "GitaChapter",

      // required Node field
      nodeId: `chapter-${c.chapter_number}`,

      // required GitaChapter fields
      id: c.chapter_number,
      chapterNumber: c.chapter_number,
      chapterSummary: c.chapter_summary ?? "",
      chapterSummaryHindi: c.chapter_summary_hindi ?? "",

      name: c.name ?? "",
      nameTranslated: c.name_translation ?? "",
      nameMeaning: c.name_meaning ?? "",
      nameTransliterated: c.name_transliterated ?? "",
      slug: "",

      versesCount: c.verses_count ?? 0,

      // ❗ required nested GraphQL structure (placeholder)
      gitaVersesByChapterId: {
        __typename: "GitaVersesConnection",
        nodes: [],
        edges: [],
        totalCount: 0,
        pageInfo: {
          __typename: "PageInfo",
          endCursor: null,
          startCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      }
    }));

    return { allGitaChapters: nodes };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch chapters from JSON API");
  }
}

const TRANSLATOR_AUTHORS: Record<string, string> = {
  id1: "Swami Prabhupada",
  id2: "A.C. Bhaktivedanta",
  18: "Swami Sivananda",
};

async function getChapterMeta(chapterNumber: string) {
  const apiurl = `${REST_NEW_BASE}/chapters.json`;
  try {
    const res = await fetch(apiurl);
    const apiChapters = await res.json();
    const numericChapterNumber = parseInt(chapterNumber);
    const apiChapter = apiChapters.find((c: any) => c.chapter_number === numericChapterNumber);
    if (!apiChapter) {
      throw new Error(`Chapter not found: ${chapterNumber}`);
    }
    return apiChapter;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch chapters from JSON API");
  }
}

async function getVersesForChapter(chapterNumber: string) {
  const apiurl = `${REST_NEW_BASE}/verse.json`;
  try {
    const res = await fetch(apiurl);
    const apiVerses = await res.json();
    const numericChapterNumber = parseInt(chapterNumber);
    const apiVersesForChapter = apiVerses.filter((v: any) => v.chapter_number === numericChapterNumber);
    if (!apiVersesForChapter) {
      throw new Error(`Verses not found for chapter: ${chapterNumber}`);
    }
    return apiVersesForChapter;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch verses from JSON API");
  }
}

export async function getChapter(
  chapterNumber: string,
  translatorAuthorId: string
) {
  const apiChapter = await getChapterMeta(chapterNumber);
  const versesCount = apiChapter.verses_count;

  const translatorName = TRANSLATOR_AUTHORS[translatorAuthorId];
  if (!translatorName) {
    throw new Error(`Unknown translatorAuthorId: ${translatorAuthorId}`);
  }

  const apiVersesForChapter = await getVersesForChapter(chapterNumber);
  // Fetch all verses
  const versePromises = [];
  for (let v = 1; v <= versesCount; v++) {
    versePromises.push(
      fetch(
        `https://vedicscriptures.github.io/slok/${chapterNumber}/${v}/`,
        { next: { revalidate: 3600 } }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(
            `Verse not found: chapter ${chapterNumber}, verse ${v}`
          );
        }
        return res.json();
      })
    );
  }

  const versesRaw = await Promise.all(versePromises);
  // console.log("versesRaw.length ", versesRaw.length);
  // console.log("translatorName ", translatorName);

  // Map verses
  const nodes = apiVersesForChapter.map((v: any, index: number) => {
    // if (!index) {console.log("v", v);}
    let filteredTranslations = [];
    filteredTranslations[0] = {
      __typename: "GitaTranslation" as const,
      nodeId: `${v.chapter}-${v.verse}`,
      id: 1,
      authorName: translatorName,
      description: "Dummy translation text.",
      gitaVerseByVerseId: null,
      gitaAuthorByAuthorId: null,
      gitaLanguageByLanguageId: null,
      language: "English",
      languageId: null,
      verseId: v.verse_order,
    }
    // if (v.siva.author === translatorName && v.siva.et){
    //   filteredTranslations[0] = {
    //     __typename: "GitaTranslation" as const,
    //     nodeId: `${v.chapter}-${v.verse}`,
    //     id: 1,
    //     authorName: translatorName,
    //     description: v.siva.et,
    //     gitaVerseByVerseId: null,
    //     gitaAuthorByAuthorId: null,
    //     gitaLanguageByLanguageId: null,
    //     language: "English",
    //     languageId: null,
    //     verseId: v.verse,
    //   }
    // }

    // const numericVerseId = calcNumericVerseId(
    //   parseInt(v.chapter),
    //   parseInt(v.verse)
    // );

    return {
      __typename: "GitaVerse" as const,
      nodeId: `${v.chapter}-${v.verse_number}`,
      // id: numericVerseId,
      id: v.verse_order,
      chapterId: parseInt(chapterNumber),
      chapterNumber: v.chapter_number,
      text: v.text,
      transliteration: v.transliteration,
      verseNumber: v.verse_number,
      wordMeanings: v.word_meanings ?? null,
      gitaTranslationsByVerseId: {
        __typename: "GitaTranslationsConnection" as const,
        nodes: filteredTranslations,
        edges: filteredTranslations.map((tr) => ({ __typename: "GitaTranslationsEdge" as const, cursor: tr.nodeId, node: tr })),
        pageInfo: { __typename: "PageInfo" as const, hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
        totalCount: filteredTranslations.length,
      },
      gitaCommentariesByVerseId: {
        __typename: "GitaCommentariesConnection" as const,
        nodes: [],
        edges: [],
        pageInfo: { __typename: "PageInfo" as const, hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
        totalCount: 0,
      },
      gitaChapterByChapterId: null,
      slug: null,
    };
  });

  // console.log("nodes.length ", nodes.length)
  // console.log("nodes[0]", nodes[0]);
  // console.log("nodes[0].gitaTranslationsByVerseId.nodes[0]", nodes[0].gitaTranslationsByVerseId.nodes[0]);

  return {
    gitaChapter: {
      __typename: "GitaChapter" as const,
      nodeId: `chapter-${chapterNumber}`,
      id: parseInt(chapterNumber),
      chapterNumber: apiChapter.chapter_number,
      name: apiChapter.name ?? null,
      nameTranslated: apiChapter.name_translation ?? null,
      chapterSummary: apiChapter?.chapter_summary ?? null,
      chapterSummaryHindi: apiChapter?.chapter_summary_hindi ?? null,
      versesCount,
      gitaVersesByChapterId: {
        __typename: "GitaVersesConnection" as const,
        nodes,
        edges: nodes.map((n: any) => ({ __typename: "GitaVersesEdge" as const, cursor: n.nodeId, node: n })),
        pageInfo: { __typename: "PageInfo" as const, hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
        totalCount: nodes.length,
      },
    },
  };
}

// export async function getVerse(chapterNumber: string, verseNumber: string) {
export async function getVerse(verseId: string) {
  const chapVerseNumbers = getCVNumbersFromVerseId(verseId);
  const chapterNumber = chapVerseNumbers.chapterNumber;
  const verseNumber = chapVerseNumbers.verseNumber;
  const url = `https://vedicscriptures.github.io/slok/${chapterNumber}/${verseNumber}/`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Verse not found for chapter ${chapterNumber}, verse ${verseNumber}`);
  }

  const v = await res.json();
  // console.log("Fetched verse data for ", verseId, v);

  //
  // ---- Translations ----
  //
  // const translationsRaw = v.siva ?? {};
  let translationNodes = [];
  translationNodes[0] = {
      __typename: "GitaTranslation" as const,
      nodeId: `${chapterNumber}-${verseNumber}`,
      id: 1,
      authorName: v?.siva?.author ?? null,
      description: v?.siva?.et ?? null,
      gitaVerseByVerseId: null,
      gitaAuthorByAuthorId: null,
      gitaLanguageByLanguageId: null,
      language: "English",
      languageId: null,
      verseId: v.verseNumber,
  }
  // translationNodes = Object.keys(translationsRaw).map((key, idx) => {
  //   const tr = translationsRaw[key];

  //   return {
  //     __typename: "GitaTranslation" as const,
  //     nodeId: `${chapterNumber}-${verseNumber}-tr-${idx}`,
  //     id: idx + 1,
  //     authorName: tr.author ?? null,
  //     description: tr.et ?? tr.ht ?? tr.t ?? null,
  //     gitaVerseByVerseId: null,
  //     gitaAuthorByAuthorId: null,
  //     gitaLanguageByLanguageId: null,
  //     language: tr.language ?? "English",
  //     languageId: null,
  //     verseId: v.verse,
  //   };
  // });

  const gitaTranslationsByVerseId = {
    __typename: "GitaTranslationsConnection" as const,
    nodes: translationNodes,
    edges: translationNodes.map((node) => ({
      __typename: "GitaTranslationsEdge" as const,
      cursor: node.nodeId,
      node,
    })),
    totalCount: translationNodes.length,
    pageInfo: {
      __typename: "PageInfo" as const,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
  };

  //
  // ---- Commentaries ----
  //
  // const commentariesRaw = v.commentaries ?? {};
  let commentaryNodes = [];
  commentaryNodes[0] = {
      __typename: "GitaCommentary" as const,
      nodeId: `${chapterNumber}-${verseNumber}`,
      id: 1,
      authorName: v?.siva?.author ?? null,
      description: v?.siva?.ec ?? null,
      gitaVerseByVerseId: null,
      gitaAuthorByAuthorId: null,
      gitaLanguageByLanguageId: null,
      language: "English",
      languageId: null,
      verseId: v.verseNumber,
  }
  // const commentaryNodes = Object.keys(commentariesRaw).map((key, idx) => {
  //   const c = commentariesRaw[key];

  //   return {
  //     __typename: "GitaCommentary" as const,
  //     nodeId: `${v.chapter}-${v.verse}-com-${idx}`,
  //     id: idx + 1,
  //     authorName: c.author ?? null,
  //     description: c.text ?? null,
  //     language: c.language ?? "English",
  //     languageId: null,
  //     verseId: v.verse,
  //     gitaVerseByVerseId: null,
  //     gitaAuthorByAuthorId: null,
  //     gitaLanguageByLanguageId: null,
  //   };
  // });

  const gitaCommentariesByVerseId = {
    __typename: "GitaCommentariesConnection" as const,
    nodes: commentaryNodes,
    edges: commentaryNodes.map((node) => ({
      __typename: "GitaCommentariesEdge" as const,
      cursor: node.nodeId,
      node,
    })),
    totalCount: commentaryNodes.length,
    pageInfo: {
      __typename: "PageInfo" as const,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    },
  };

  //
  // ---- Final Verse Node ----
  //
  const verseNode = {
    __typename: "GitaVerse" as const,
    nodeId: `${v.chapter}-${v.verse}`,
    id: v.verse,
    chapterId: parseInt(chapterNumber),
    chapterNumber: v.chapter,
    verseNumber: v.verse,
    text: v.slok,
    transliteration: v.transliteration,
    wordMeanings: v.tepa ?? null,
    slug: null,

    gitaTranslationsByVerseId,
    gitaCommentariesByVerseId,
    gitaChapterByChapterId: null,
  };

  return {
    gitaVerse: verseNode,
  };
}
