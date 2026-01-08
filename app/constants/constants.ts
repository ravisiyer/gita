export const GRAPHQL_URI = "https://gql.bhagavadgita.io/graphql";
export const GRAPHQL_EXPLORER_URI = "https://gql.bhagavadgita.io/graphiql";

// Hard coded now; Consider replacing later from GraphQL data
export const FIRST_CHAPTERNUMBER = 1;
export const LAST_CHAPTERNUMBER = 18;
export const FIRST_VERSEID = 1;
export const LAST_VERSEID = 701;
export const MIN_VERSE_NUMBER_IN_ALL_CHAPTERS = 1;
export const MAX_VERSE_NUMBER_IN_ALL_CHAPTERS = 78;
export const NUMBER_OF_VERSES_IN_CHAPTERS = [
  47, //Chapter 1, index 0
  72, //Chapter 2
  43, //Chapter 3
  42, //Chapter 4
  29, //Chapter 5
  47, //Chapter 6
  30, //Chapter 7
  28, //Chapter 8
  34, //Chapter 9
  42, //Chapter 10
  55, //Chapter 11
  20, //Chapter 12
  35, //Chapter 13
  27, //Chapter 14
  20, //Chapter 15
  24, //Chapter 16
  28, //Chapter 17
  78, //Chapter 18, index 17
];

// Starting verse_id per chapter (VC is verse count) - CG generated based on above data provided as input.
// Ch	VC	Starting verse_id
// 1	47	1
// 2	72	48
// 3	43	120
// 4	42	163
// 5	29	205
// 6	47	234
// 7	30	281
// 8	28	311
// 9	34	339
// 10	42	373
// 11	55	415
// 12	20	470
// 13	35	490
// 14	27	525
// 15	20	552
// 16	24	572
// 17	28	596
// 18	78	624

export const SCV_CHAPTER_LABEL = "Ch.";
export const SCV_VERSE_LABEL = "Ve.";
export const SCV_CHAPTER_OR_VERSE_NOT_SPECIFIED_STR = "-";

export const LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX = "check";
export const TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX = "Transl";
export const COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX = "Commnt";
export const CHAPTER_PAGE_TRANSLATOR_FIELD_NAME = "chptransl";
export const DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR = "16";  // Swami Sivananda
// export const DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR = "18"; // Swami Adidevananda
export const QMARK_TO_COMMA_FIELD_NAME = "qmarktocomma";
export const DEFAULT_QMARK_TO_COMMA_VALUE = true;
// LTS = Language (for) Title (and) Summary
export const ENGLISH_LTS_LANGUAGE_NAME = "English";
export const HINDI_LTS_LANGUAGE_NAME = "Hindi";
export const LTS_FIELD_NAME_SUFFIX = "LTS";
export const DEFAULT_ENGLISH_LTS_CHECKED = true;
export const DEFAULT_HINDI_LTS_CHECKED = true;
export const FULL_WINDOW_WIDTH_FIELD_NAME = "fullwidth";
export const DEFAULT_FULL_WINDOW_WIDTH_CHECKED = false;

export const SETTINGS_COOKIE_NAME = "GitaAppSettings";

export const MAIN_CONTAINER_MAX_WIDTH_TAILWIND = " max-w-[960px]";
export const TAILWIND_MD_BREAKPOINT = 768; // TW md breakpoint
