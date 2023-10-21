/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  fragment dashboardArticle on Article {\n    id\n    title\n    slug\n    leadImage\n    content\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n": types.DashboardArticleFragmentDoc,
    "\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n": types.DashboardArticleInListFragmentDoc,
    "\n  fragment basicDashboardCategory on Category {\n    id\n    name\n  }\n": types.BasicDashboardCategoryFragmentDoc,
    "\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n  }\n": types.DashboardCategoryFragmentDoc,
    "\n  fragment dashboardMessage on Message {\n    id\n    name\n    email\n    content\n    replySent\n  }\n": types.DashboardMessageFragmentDoc,
    "\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n": types.DashboardUserFragmentDoc,
    "\n  mutation createArticle($createArticleInput: CreateArticleInput!) {\n    createArticle(createArticleInput: $createArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n": types.CreateArticleDocument,
    "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n": types.CreateCategoryDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n": types.CreateUserDocument,
    "\n  mutation deleteArticle($id: String!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n": types.DeleteArticleDocument,
    "\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation updateArticle($id: String!, $updateArticleInput: UpdateArticleInput!) {\n    updateArticle(id: $id, updateArticleInput: $updateArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n": types.UpdateArticleDocument,
    "\n  mutation updateCategory($id: String!, $updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n": types.UpdateCategoryDocument,
    "\n  mutation updateUser($id: String!, $updateUserInput: UpdateUserInput!) {\n    updateUser(id: $id, updateUserInput: $updateUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n": types.UpdateUserDocument,
    "\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n": types.DashboardArticlesDocument,
    "\n  query basicDashboardCategories {\n    categories {\n      ...basicDashboardCategory\n    }\n  }\n\n  \n": types.BasicDashboardCategoriesDocument,
    "\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n": types.DashboardCategoriesDocument,
    "\n  query dashboardCategory($id: String!) {\n    category(id: $id) {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n": types.DashboardCategoryDocument,
    "\n  query dashboardMessages($grid: MessagesGridInput) {\n    messages(grid: $grid) {\n      total\n      rows {\n        ...dashboardMessage\n      }\n    }\n  }\n\n  \n": types.DashboardMessagesDocument,
    "\n  query dashboardUsers($grid: UsersGridInput) {\n    users(grid: $grid) {\n      total\n      rows {\n        ...dashboardUser\n      }\n    }\n  }\n\n  \n": types.DashboardUsersDocument,
    "\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n": types.ArticleFragmentDoc,
    "\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.ArticleInListFragmentDoc,
    "\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n": types.CategoryFragmentDoc,
    "\n  fragment categoryWithArticles on Category {\n    id\n    name\n    slug\n\n    articles {\n      id\n      content\n      createdAt\n      isHidden\n      leadImage\n      slug\n      title\n      updatedAt\n\n      author {\n        avatar\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n": types.CategoryWithArticlesFragmentDoc,
    "\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n": types.ArticleDocument,
    "\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n": types.ArticlesByCategoryDocument,
    "\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n": types.CategoriesDocument,
    "\n  query highlightedArticles {\n    highlightedArticles {\n      ...article\n    }\n  }\n\n  \n": types.HighlightedArticlesDocument,
    "\n  query homePageArticles {\n    homePageArticles {\n      ...categoryWithArticles\n    }\n  }\n\n  \n": types.HomePageArticlesDocument,
};

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
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment dashboardArticle on Article {\n    id\n    title\n    slug\n    leadImage\n    content\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment dashboardArticle on Article {\n    id\n    title\n    slug\n    leadImage\n    content\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment dashboardArticleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    isHidden\n    isHighlighted\n    author {\n      id\n      firstName\n      lastName\n    }\n    category {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment basicDashboardCategory on Category {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment basicDashboardCategory on Category {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n  }\n"): (typeof documents)["\n  fragment dashboardCategory on Category {\n    id\n    name\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment dashboardMessage on Message {\n    id\n    name\n    email\n    content\n    replySent\n  }\n"): (typeof documents)["\n  fragment dashboardMessage on Message {\n    id\n    name\n    email\n    content\n    replySent\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n"): (typeof documents)["\n  fragment dashboardUser on User {\n    id\n    email\n    firstName\n    lastName\n    avatar\n    role\n    isSuspended\n    isAnonymous\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createArticle($createArticleInput: CreateArticleInput!) {\n    createArticle(createArticleInput: $createArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation createArticle($createArticleInput: CreateArticleInput!) {\n    createArticle(createArticleInput: $createArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation createCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteArticle($id: String!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteArticle($id: String!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCategory($id: String!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateArticle($id: String!, $updateArticleInput: UpdateArticleInput!) {\n    updateArticle(id: $id, updateArticleInput: $updateArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation updateArticle($id: String!, $updateArticleInput: UpdateArticleInput!) {\n    updateArticle(id: $id, updateArticleInput: $updateArticleInput) {\n      ...dashboardArticle\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCategory($id: String!, $updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation updateCategory($id: String!, $updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {\n      ...dashboardCategory\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($id: String!, $updateUserInput: UpdateUserInput!) {\n    updateUser(id: $id, updateUserInput: $updateUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation updateUser($id: String!, $updateUserInput: UpdateUserInput!) {\n    updateUser(id: $id, updateUserInput: $updateUserInput) {\n      ...dashboardUser\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n"): (typeof documents)["\n  query dashboardArticles($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...dashboardArticleInList\n      }\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query basicDashboardCategories {\n    categories {\n      ...basicDashboardCategory\n    }\n  }\n\n  \n"): (typeof documents)["\n  query basicDashboardCategories {\n    categories {\n      ...basicDashboardCategory\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n"): (typeof documents)["\n  query dashboardCategories {\n    categories {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dashboardCategory($id: String!) {\n    category(id: $id) {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n"): (typeof documents)["\n  query dashboardCategory($id: String!) {\n    category(id: $id) {\n      ...dashboardCategory\n      articlesCount\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dashboardMessages($grid: MessagesGridInput) {\n    messages(grid: $grid) {\n      total\n      rows {\n        ...dashboardMessage\n      }\n    }\n  }\n\n  \n"): (typeof documents)["\n  query dashboardMessages($grid: MessagesGridInput) {\n    messages(grid: $grid) {\n      total\n      rows {\n        ...dashboardMessage\n      }\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dashboardUsers($grid: UsersGridInput) {\n    users(grid: $grid) {\n      total\n      rows {\n        ...dashboardUser\n      }\n    }\n  }\n\n  \n"): (typeof documents)["\n  query dashboardUsers($grid: UsersGridInput) {\n    users(grid: $grid) {\n      total\n      rows {\n        ...dashboardUser\n      }\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment article on Article {\n    id\n    content\n    createdAt\n    isHidden\n    leadImage\n    slug\n    title\n    updatedAt\n\n    author {\n      avatar\n      firstName\n      lastName\n      id\n    }\n\n    category {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  fragment articleInList on Article {\n    id\n    title\n    slug\n    createdAt\n    leadImage\n    author {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n"): (typeof documents)["\n  fragment category on Category {\n    id\n    name\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment categoryWithArticles on Category {\n    id\n    name\n    slug\n\n    articles {\n      id\n      content\n      createdAt\n      isHidden\n      leadImage\n      slug\n      title\n      updatedAt\n\n      author {\n        avatar\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment categoryWithArticles on Category {\n    id\n    name\n    slug\n\n    articles {\n      id\n      content\n      createdAt\n      isHidden\n      leadImage\n      slug\n      title\n      updatedAt\n\n      author {\n        avatar\n        firstName\n        lastName\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n"): (typeof documents)["\n  query article($filter: ArticleFilterInput!) {\n    article(filter: $filter) {\n      ...article\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n"): (typeof documents)["\n  query articlesByCategory($grid: ArticlesGridInput) {\n    articles(grid: $grid) {\n      total\n      rows {\n        ...articleInList\n      }\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n"): (typeof documents)["\n  query categories {\n    categories {\n      ...category\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query highlightedArticles {\n    highlightedArticles {\n      ...article\n    }\n  }\n\n  \n"): (typeof documents)["\n  query highlightedArticles {\n    highlightedArticles {\n      ...article\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query homePageArticles {\n    homePageArticles {\n      ...categoryWithArticles\n    }\n  }\n\n  \n"): (typeof documents)["\n  query homePageArticles {\n    homePageArticles {\n      ...categoryWithArticles\n    }\n  }\n\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;