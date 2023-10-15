export enum CategoriesTableHeadersKeys {
  ID = 'id',
  NAME = 'name',
  ARTICLES_COUNT = 'articlesCount',
}

export type CategoryFormDialogState =
  | {
      state: 'open'
      categoryId?: string
    }
  | { state: 'loading' }
  | { state: 'closed' }
