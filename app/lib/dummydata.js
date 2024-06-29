export async function getAllChapters() {
  const dummyNodes = [
    {
      id: 1,
      chapterNumber: 1,
      chapterSummary: "1 Summary",
      chapterSummaryHindi: "1 Hindi Summary",
      name: "1 name",
      nameTranslated: "1 nameTranslated",
      versesCount: "47",
    },
    {
      id: 2,
      chapterNumber: 2,
      chapterSummary: "2 Summary",
      chapterSummaryHindi: "2 Hindi Summary",
      name: "2 name",
      nameTranslated: "2 nameTranslated",
      versesCount: "72",
    },
    {
      id: 3,
      chapterNumber: 3,
      chapterSummary: "3 Summary",
      chapterSummaryHindi: "3 Hindi Summary",
      name: "3 name",
      nameTranslated: "3 nameTranslated",
      versesCount: "43",
    },
  ];

  return {
    allGitaChapters: dummyNodes,
  };
}

export async function getChapter(chapterNumber) {
  const dummyNodes = [
    {
      versesCount: 47,
      name: `${chapterNumber} name`,
      nameTranslated: "1 nameTranslated",
      chapterSummary: "1 chapterSummary",
      chapterSummaryHindi: "1 chapterSummaryHindi",
      gitaVersesByChapterId: {
        nodes: [
          {
            verseNumber: 1,
            transliteration: "1 transliteration",
            id: 1,
            text: "1 text",
            wordMeanings: "1 wordMeanings",
            gitaTranslationsByVerseId: {
              nodes: [
                {
                  description: "1 description",
                  verseId: 1,
                  authorName: "1 authorName",
                },
              ],
            },
          },
        ],
      },
    },
  ];

  return {
    gitaChapter: dummyNodes[0],
  };
}

export async function getVerse(verseId) {
  const dummyNodes = [
    {
      chapterNumber: 1,
      verseNumber: 1,
      text: `For verseId:${verseId} text`,
      transliteration: "1 transliteration",
      wordMeanings: "1 wordMeanings",
      gitaTranslationsByVerseId: {
        nodes: [
          {
            authorId: 1,
            authorName: "1 authorName",
            description: "1 description",
            language: "1 language",
          },
        ],
      },
      gitaCommentariesByVerseId: {
        nodes: [
          {
            authorId: 1,
            authorName: "1 authorName",
            description: "1 description",
            language: "1 language",
          },
        ],
      },
    },
  ];

  return {
    gitaVerse: dummyNodes[0],
  };
}
