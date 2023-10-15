import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  TextMatchTransformer,
  Transformer,
} from '@lexical/markdown'

import { $createImageNode, $isImageNode, ImageNode } from '../../nodes/ImageNode'

export const IMAGE: TextMatchTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!$isImageNode(node)) {
      return null
    }

    return `![${node.getAltText()}](${node.getSrc()})`
  },
  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, altText, src] = match
    const imageNode = $createImageNode({
      altText,
      maxWidth: 800,
      src,
    })
    textNode.replace(imageNode)
  },
  trigger: ')',
  type: 'text-match',
}

export const PLAYGROUND_TRANSFORMERS: Array<Transformer> = [
  IMAGE,
  CHECK_LIST,
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
]
