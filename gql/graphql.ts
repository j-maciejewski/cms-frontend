/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Article = {
  __typename?: 'Article'
  author?: Maybe<User>
  category?: Maybe<Category>
  content: Scalars['String']['output']
  createdAt: Scalars['String']['output']
  id: Scalars['String']['output']
  isHidden: Scalars['Boolean']['output']
  isHighlighted: Scalars['Boolean']['output']
  leadImage: Scalars['String']['output']
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt: Scalars['String']['output']
}

export type ArticleFilterInput = {
  id?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type ArticlesGridInput = {
  filter?: InputMaybe<ArticlesGridInputFilter>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type ArticlesGridInputFilter = {
  authorId?: InputMaybe<Scalars['String']['input']>
  categoryId?: InputMaybe<Scalars['String']['input']>
  categorySlug?: InputMaybe<Scalars['String']['input']>
  fullText?: InputMaybe<Scalars['String']['input']>
}

export type ArticlesListResponse = {
  __typename?: 'ArticlesListResponse'
  rows: Array<Article>
  total: Scalars['Int']['output']
}

export type Category = {
  __typename?: 'Category'
  articles?: Maybe<Array<Article>>
  articlesCount: Scalars['Int']['output']
  id: Scalars['String']['output']
  isHidden: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  slug: Scalars['String']['output']
}

export type CreateArticleInput = {
  authorId: Scalars['String']['input']
  categoryId: Scalars['String']['input']
  content: Scalars['String']['input']
  leadImage: Scalars['String']['input']
  slug?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type CreateCategoryInput = {
  name: Scalars['String']['input']
  slug?: InputMaybe<Scalars['String']['input']>
}

export type CreateUserInput = {
  email: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  createArticle: Article
  createCategory: Category
  createUser: User
  removeArticle?: Maybe<Article>
  removeCategory?: Maybe<Category>
  removeUser?: Maybe<User>
  updateArticle: Article
  updateCategory: Category
  updateUser: User
}

export type MutationCreateArticleArgs = {
  createArticleInput: CreateArticleInput
}

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationRemoveArticleArgs = {
  id: Scalars['String']['input']
}

export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input']
}

export type MutationRemoveUserArgs = {
  id: Scalars['String']['input']
}

export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput
}

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type Query = {
  __typename?: 'Query'
  article?: Maybe<Article>
  articles: ArticlesListResponse
  categories: Array<Category>
  category?: Maybe<Category>
  user?: Maybe<User>
  users: Array<Maybe<User>>
}

export type QueryArticleArgs = {
  filter: ArticleFilterInput
}

export type QueryArticlesArgs = {
  grid?: InputMaybe<ArticlesGridInput>
}

export type QueryCategoryArgs = {
  id: Scalars['String']['input']
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type UpdateArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  leadImage?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type UpdateCategoryInput = {
  id: Scalars['String']['input']
  isHidden?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  firstName?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>
  isSuspended?: InputMaybe<Scalars['Boolean']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type User = {
  __typename?: 'User'
  articles?: Maybe<Array<Article>>
  avatar?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  firstName: Scalars['String']['output']
  id: Scalars['String']['output']
  isAnonymous: Scalars['Boolean']['output']
  isSuspended: Scalars['Boolean']['output']
  lastName: Scalars['String']['output']
  password: Scalars['String']['output']
  role: Scalars['String']['output']
}

export type DashboardArticleInListFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  createdAt: string
  isHidden: boolean
  isHighlighted: boolean
  author?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
  category?: { __typename?: 'Category'; id: string; name: string; slug: string } | null
}

export type DashboardCategoryFragment = {
  __typename?: 'Category'
  id: string
  name: string
  slug: string
  articlesCount: number
}

export type DashboardUserFragment = {
  __typename?: 'User'
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string | null
  role: string
  isSuspended: boolean
  isAnonymous: boolean
}

export type DashboardArticlesQueryVariables = Exact<{
  grid?: InputMaybe<ArticlesGridInput>
}>

export type DashboardArticlesQuery = {
  __typename?: 'Query'
  articles: {
    __typename?: 'ArticlesListResponse'
    total: number
    rows: Array<{
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      createdAt: string
      isHidden: boolean
      isHighlighted: boolean
      author?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
      category?: { __typename?: 'Category'; id: string; name: string; slug: string } | null
    }>
  }
}

export type DashboardCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type DashboardCategoriesQuery = {
  __typename?: 'Query'
  categories: Array<{ __typename?: 'Category'; id: string; name: string; slug: string; articlesCount: number }>
}

export type DashboardUsersQueryVariables = Exact<{ [key: string]: never }>

export type DashboardUsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    email: string
    firstName: string
    lastName: string
    avatar?: string | null
    role: string
    isSuspended: boolean
    isAnonymous: boolean
  } | null>
}

export type ArticleFragment = {
  __typename?: 'Article'
  id: string
  content: string
  createdAt: string
  isHidden: boolean
  leadImage: string
  slug: string
  title: string
  updatedAt: string
  author?: { __typename?: 'User'; avatar?: string | null; firstName: string; lastName: string; id: string } | null
  category?: { __typename?: 'Category'; id: string; name: string; slug: string } | null
}

export type ArticleInListFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  createdAt: string
  leadImage: string
  author?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
}

export type CategoryFragment = { __typename?: 'Category'; id: string; name: string; slug: string }

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput
}>

export type CreateCategoryMutation = {
  __typename?: 'Mutation'
  createCategory: { __typename?: 'Category'; id: string; name: string; slug: string }
}

export type ArticleQueryVariables = Exact<{
  filter: ArticleFilterInput
}>

export type ArticleQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    content: string
    createdAt: string
    isHidden: boolean
    leadImage: string
    slug: string
    title: string
    updatedAt: string
    author?: { __typename?: 'User'; avatar?: string | null; firstName: string; lastName: string; id: string } | null
    category?: { __typename?: 'Category'; id: string; name: string; slug: string } | null
  } | null
}

export type ArticlesByCategoryQueryVariables = Exact<{
  grid?: InputMaybe<ArticlesGridInput>
}>

export type ArticlesByCategoryQuery = {
  __typename?: 'Query'
  articles: {
    __typename?: 'ArticlesListResponse'
    total: number
    rows: Array<{
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      createdAt: string
      leadImage: string
      author?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
    }>
  }
}

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>

export type CategoriesQuery = {
  __typename?: 'Query'
  categories: Array<{ __typename?: 'Category'; id: string; name: string; slug: string }>
}

export const DashboardArticleInListFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardArticleInList' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHighlighted' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardArticleInListFragment, unknown>
export const DashboardCategoryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardCategory' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Category' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'articlesCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardCategoryFragment, unknown>
export const DashboardUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardUser' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSuspended' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAnonymous' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardUserFragment, unknown>
export const ArticleFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'article' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          { kind: 'Field', name: { kind: 'Name', value: 'leadImage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleFragment, unknown>
export const ArticleInListFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'articleInList' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'leadImage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleInListFragment, unknown>
export const CategoryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'category' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Category' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoryFragment, unknown>
export const DashboardArticlesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dashboardArticles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'grid' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticlesGridInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'articles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'grid' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'grid' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rows' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'dashboardArticleInList' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardArticleInList' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHighlighted' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardArticlesQuery, DashboardArticlesQueryVariables>
export const DashboardCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dashboardCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'dashboardCategory' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardCategory' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Category' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'articlesCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardCategoriesQuery, DashboardCategoriesQueryVariables>
export const DashboardUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dashboardUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'dashboardUser' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'dashboardUser' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
          { kind: 'Field', name: { kind: 'Name', value: 'role' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSuspended' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAnonymous' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardUsersQuery, DashboardUsersQueryVariables>
export const CreateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'createCategoryInput' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCategoryInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCategoryInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'createCategoryInput' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>
export const ArticleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'article' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticleFilterInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'article' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'article' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'article' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isHidden' } },
          { kind: 'Field', name: { kind: 'Name', value: 'leadImage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'category' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticleQuery, ArticleQueryVariables>
export const ArticlesByCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'articlesByCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'grid' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArticlesGridInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'articles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'grid' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'grid' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rows' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'articleInList' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'articleInList' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Article' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'leadImage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArticlesByCategoryQuery, ArticlesByCategoryQueryVariables>
export const CategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'categories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'category' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'category' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Category' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>
