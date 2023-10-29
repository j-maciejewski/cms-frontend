export enum CategoriesTableHeadersKeys {
  ID = 'id',
  NAME = 'name',
  IS_HIDDEN = 'isHidden',
  ARTICLES_COUNT = 'articlesCount',
  MANAGEMENT = 'management',
}

export type CategoryFormDialogState =
  | {
      state: 'open'
      categoryId?: string
    }
  | { state: 'loading' }
  | { state: 'closed' }
