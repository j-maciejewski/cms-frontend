export enum ArticlesTableHeadersKeys {
  ID = 'id',
  TITLE = 'title',
  AUTHOR = 'author',
  CATEGORY = 'category',
}

export type ArticleFormDialogState =
  | {
      state: 'open'
      articleId?: string
    }
  | { state: 'loading' }
  | { state: 'closed' }
