import { NUMBER_OF_VERSES_IN_CHAPTERS } from "../constants/constants";
import { GitaChapter } from "./gqltypes-d";
import { calcNumericVerseId, getCVNumbersFromVerseId } from "./util";

// data-rest.ts
const REST_NEW_BASE = "https://ravisiyer.github.io/gita-data/v1";

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
  16: "Swami Sivananda",
  18: "Swami Adidevananda",
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

async function getVerseMeta(verseId: string) {
  const apiurl = `${REST_NEW_BASE}/verse.json`;
  try {
    const res = await fetch(apiurl);
    const apiVerses = await res.json();
    const numericVerseId = parseInt(verseId);
    const apiVerse = apiVerses.find((v: any) => v.id === numericVerseId);
    if (!apiVerse) {
      throw new Error(`Verse not found for verseId: ${verseId}`);
    }
    return apiVerse;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch verse from JSON API");
  }
}

/**
 * Groups translation entries by verse_id.
 *
 * @param {Array<Object>} translations
 * @returns {Object} Record<verse_id, Array<translation>>
 */
export function groupTranslationsByVerseId(translations: any) {
  const byVerseId: any = {}; // Plain object used as a key-based lookup (dictionary), not an array

  for (const entry of translations) {
    const verseId = entry.verse_id;

    if (verseId == null) {
      // Defensive: skip malformed entries
      continue;
    }

    if (byVerseId[verseId] === undefined) {
      byVerseId[verseId] = [];  // Initialize the value for this verseId key as an empty array
    }

    byVerseId[verseId].push(entry); // Push entry to array at verseId key
  }

  return byVerseId;
}

async function getTranslationsForChapter(chapterNumber: string) {
  const apiurl = `${REST_NEW_BASE}/translation.json`;
  try {
    const res = await fetch(apiurl);
    const apiTranslations = await res.json();
    const numericChapterNumber = parseInt(chapterNumber);
    const firstVerseIdInChapter = calcNumericVerseId(numericChapterNumber, 1);
    const lastVerseIdInChapter = firstVerseIdInChapter + NUMBER_OF_VERSES_IN_CHAPTERS[numericChapterNumber - 1] - 1;
    const apiTranslationsForChapter = 
      apiTranslations.filter((t: any) => t.verse_id >= firstVerseIdInChapter && t.verse_id <= lastVerseIdInChapter);
    if (!apiTranslationsForChapter) {
      throw new Error(`Translations not found for chapter: ${chapterNumber}`);
    }
    const groupedTranslationsbyVerseId = groupTranslationsByVerseId(apiTranslationsForChapter);
    return groupedTranslationsbyVerseId;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch translations from JSON API");
  }
}

async function getTranslationsForVerse(verseId: string) {
  const apiurl = `${REST_NEW_BASE}/translation.json`;
  try {
    const res = await fetch(apiurl);
    const apiTranslations = await res.json();
    const numericverseId = parseInt(verseId);
    const apiTranslationsForVerse = 
      apiTranslations.filter((t: any) => t.verse_id === numericverseId);
    if (apiTranslationsForVerse.length === 0) {
      throw new Error(`Translations not found for verse: ${verseId}`);
    }
    return apiTranslationsForVerse;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch translations from JSON API");
  }
}

async function getCommentariesForChapterAuthorLang(
  chapterNumber: string,
  authorId: string,
  langId: string
) {
  const apiurl =
    `${REST_NEW_BASE}/commentaries/author${authorId}` +
    `/lang${langId}` +
    `/chapter${chapterNumber}.json`;

  const res = await fetch(apiurl);

  if (!res.ok) {
    throw new Error(
      `Failed to load commentaries: author=${authorId}, lang=${langId}, chapter=${chapterNumber}`
    );
  }
  const apiCommentaries = await res.json();
  return apiCommentaries;
}

async function getCommentaryForVerseAuthorLang(
  verseId: string,
  authorId: string,
  langId: string
) {
  const chapVerseNumbers = getCVNumbersFromVerseId(verseId);
  const chapterNumber = chapVerseNumbers.chapterNumber;
  const numericVerseId = parseInt(verseId);
  const apiCommentaries = await getCommentariesForChapterAuthorLang(chapterNumber,
  authorId, langId);
  const apiCommentaryforVerse = apiCommentaries.find((c: any) => c.verse_id === numericVerseId);
  if (!apiCommentaryforVerse) {
    throw new Error(
      `Failed to load commentary for author=${authorId}, lang=${langId}, verse=${verseId}`
    );
  }
  return apiCommentaryforVerse;
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
  const groupedTranslationsbyVerseId = await getTranslationsForChapter(chapterNumber);
  
  // Map verses
  const nodes = apiVersesForChapter.map((v: any, index: number) => {
    let filteredTranslations = [];
    if (groupedTranslationsbyVerseId[v.id]) {
      const translationEntry =
        groupedTranslationsbyVerseId[v.id].find(
          (tr: any) => tr.author_id.toString() === translatorAuthorId
        );

      const translationText =
        translationEntry?.description
        ?? `No translation found for author: ${translatorName} with author id: ${translatorAuthorId}`;
      filteredTranslations[0] = {
        __typename: "GitaTranslation" as const,
        nodeId: `${v.chapter}-${v.verse}`,
        id: 1,
        authorName: translatorName,
        description: translationText,
        gitaVerseByVerseId: null,
        gitaAuthorByAuthorId: null,
        gitaLanguageByLanguageId: null,
        language: "English",
        languageId: null,
        verseId: v.id,
      }
    } 

    return {
      __typename: "GitaVerse" as const,
      nodeId: `${v.chapter}-${v.verse_number}`,
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

export async function getVerse(verseId: string) {
  const chapVerseNumbers = getCVNumbersFromVerseId(verseId);
  const chapterNumber = chapVerseNumbers.chapterNumber;
  const verseNumber = chapVerseNumbers.verseNumber;

  const v = await getVerseMeta(verseId);

  const authorId = "16"; // Swami Sivananda
  const languageId = "1"; // English
  const translationsForVerse = await getTranslationsForVerse(verseId);
  const translationByAuthorLanguage = translationsForVerse.find(
    (tr: any) => tr.author_id.toString() === authorId && tr.language_id.toString() === languageId
  );

  const translatorName = TRANSLATOR_AUTHORS[authorId];
  if (!translatorName) {
    throw new Error(`Unknown authorId: ${authorId}`);
  }

  let translationNodes = [];
  translationNodes[0] = {
      __typename: "GitaTranslation" as const,
      nodeId: `${chapterNumber}-${verseNumber}`,
      id: 1,
      authorName: translatorName ?? null,
      description: translationByAuthorLanguage?.description ?? null,
      gitaVerseByVerseId: null,
      gitaAuthorByAuthorId: null,
      gitaLanguageByLanguageId: null,
      language: "English",
      languageId: parseInt(languageId),
      verseId: v.id,
  }

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

  const commentaryForVerseAuthorLang = await getCommentaryForVerseAuthorLang(verseId, authorId, languageId);

  let commentaryNodes = [];
  commentaryNodes[0] = {
      __typename: "GitaCommentary" as const,
      nodeId: `${chapterNumber}-${verseNumber}`,
      id: 1,
      authorName: translatorName ?? null,
      description: commentaryForVerseAuthorLang?.description ?? null,
      gitaVerseByVerseId: null,
      gitaAuthorByAuthorId: null,
      gitaLanguageByLanguageId: null,
      language: "English",
      languageId: null,
      verseId: v.id,
  }

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

  const verseNode = {
    __typename: "GitaVerse" as const,
    nodeId: `${v.chapter}-${v.verse}`,
    id: v.id,
    chapterId: v.chapter_number,
    chapterNumber: v.chapter_number,
    verseNumber: v.verse_number,
    text: v.text,
    transliteration: v.transliteration,
    wordMeanings: v.word_meanings ?? null,
    slug: null,

    gitaTranslationsByVerseId,
    gitaCommentariesByVerseId,
    gitaChapterByChapterId: null,
  };

  return {
    gitaVerse: verseNode,
  };
}
