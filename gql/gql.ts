/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n':
    types.DashboardArticleInListFragmentDoc,
  '\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n    articlesCount\n  }\n':
    types.DashboardCategoryFragmentDoc,
  '\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n':
    types.DashboardUserFragmentDoc,
  '\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n':
    types.DashboardArticlesDocument,
  '\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n    }\n  }\n\n  \n':
    types.DashboardCategoriesDocument,
  '\n  query dashboardUsers {\n    users {\n      ...dashboardUser\n    }\n  }\n\n  \n': types.DashboardUsersDocument,
  '\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n':
    types.ArticleFragmentDoc,
  '\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n':
    types.ArticleInListFragmentDoc,
  '\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n': types.CategoryFragmentDoc,
  '\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n      name\n      slug\n    }\n  }\n':
    types.CreateCategoryDocument,
  '\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n':
    types.ArticleDocument,
  '\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n':
    types.ArticlesByCategoryDocument,
  '\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n': types.CategoriesDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n',
): (typeof documents)['\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n    articlesCount\n  }\n',
): (typeof documents)['\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n    articlesCount\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n',
): (typeof documents)['\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n    }\n  }\n\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query dashboardUsers {\n    users {\n      ...dashboardUser\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query dashboardUsers {\n    users {\n      ...dashboardUser\n    }\n  }\n\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n',
): (typeof documents)['\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n',
): (typeof documents)['\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n',
): (typeof documents)['\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n      name\n      slug\n    }\n  }\n',
): (typeof documents)['\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n      name\n      slug\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n',
): (typeof documents)['\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
