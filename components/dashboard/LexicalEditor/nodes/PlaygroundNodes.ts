import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { OverflowNode } from '@lexical/overflow'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type { Klass, LexicalNode } from 'lexical'

import { ImageNode } from './ImageNode'
import { KeywordNode } from './KeywordNode'

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  HashtagNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  ImageNode,
  KeywordNode,
  MarkNode,
]

export default PlaygroundNodes
