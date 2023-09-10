// declare module '*.svg' {
//   import React = require('react')
//   export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
//   const src: string
//   export default src
// }

// declare module '*.svg' {
//   const content: any
//   export default content
// }

export type Category = {
  _id: string
  name: string
  encodedName: string
}

export type Article = {
  _id: string
  description: string
  content: any[]
  tags: string[]
  views: number
  image: string
  title: string
  category: Category
  author: string
  createdAt: string
  updatedAt: string
}

export type CategoryPath = [string, string]

export type ArticlesPerCategory = {
  articles: Article[]
  _id: string
  name: string
  encodedName: string
}

export type Alert = {
  open: boolean
  status: 'success' | 'error' | undefined
  message: string
}

export type ContactForm = {
  email: string
  subject: string
  message: string
}

interface CustomComponent {
  className?: string
  style?: CSSProperties
}
