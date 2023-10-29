export enum ArticlesTableHeadersKeys {
  ID = 'id',
  TITLE = 'title',
  SLUG = 'slug',
  AUTHOR = 'author',
  CATEGORY = 'category',
  IS_HIDDEN = 'isHidden',
  IS_HIGHLIGHTED = 'isHighlighted',
  MANAGEMENT = 'management',
}

export type ArticleFormDialogState =
  | {
      state: 'open'
      articleId?: string
    }
  | { state: 'loading' }
  | { state: 'closed' }
