import styled from 'styled-components'

export const EditorScroller = styled.div<{ isEditing: boolean }>`
  border: 0;
  display: flex;
  position: relative;
  outline: 0;
  z-index: 0;
  overflow: auto;
  resize: ${({ isEditing }) => (isEditing ? 'vertical' : 'none')};

  ${({ isEditing }) => (isEditing ? 'min-height: 150px;' : 'height: unset !important;')};
`

export const EditorContainer = styled.div.attrs({
  className: 'editor',
})<{ isEditing: boolean; isDisabled: boolean }>`
  border-radius: 5px;
  margin: 0px;
  flex: auto;
  position: relative;
  resize: vertical;
  z-index: -1;
  ${({ isDisabled }) => !isDisabled && 'cursor: pointer;'}

  ${({ isEditing }) => isEditing && 'border-color: rgb(226, 226, 228);'}

  &:hover {
    ${({ isDisabled }) => !isDisabled && `border-color: rgb(226, 226, 228);`}
    ${({ isDisabled, isEditing }) => !isEditing && !isDisabled && ` background-color: #fafafa;`}
  }
`

export const Wrapper = styled.div.attrs({
  className: 'lexical',
})`
  .editor-container {
    .ltr {
      text-align: left;
    }
    .rtl {
      text-align: right;
    }
    .paragraph {
      margin: 0;
      position: relative;
    }
    .quote {
      margin: 0;
      margin-left: 20px;
      margin-bottom: 10px;
      font-size: 15px;
      color: rgb(101, 103, 107);
      border-left-color: rgb(206, 208, 212);
      border-left-width: 4px;
      border-left-style: solid;
      padding-left: 16px;
    }
    .h1 {
      font-size: 24px;
      color: rgb(5, 5, 5);
      font-weight: 400;
      margin: 0;
    }
    .h2 {
      font-size: 15px;
      color: rgb(101, 103, 107);
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
    }
    .h3 {
      font-size: 12px;
      margin: 0;
      text-transform: uppercase;
    }
    .indent {
      --lexical-indent-base-value: 40px;
    }
    .textBold {
      font-weight: bold;
    }
    .textItalic {
      font-style: italic;
    }
    .textUnderline {
      text-decoration: underline;
    }
    .textStrikethrough {
      text-decoration: line-through;
    }
    .textUnderlineStrikethrough {
      text-decoration: underline line-through;
    }
    .textSubscript {
      font-size: 0.8em;
      vertical-align: sub !important;
    }
    .textSuperscript {
      font-size: 0.8em;
      vertical-align: super;
    }
    .hashtag {
      background-color: rgba(88, 144, 255, 0.15);
      border-bottom: 1px solid rgba(88, 144, 255, 0.3);
    }
    .link {
      color: rgb(33, 111, 219);
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    .characterLimit {
      display: inline;
      background-color: #ffbbbb !important;
    }
    .ol1 {
      padding: 0;
      margin: 0;
      list-style-position: inside;
    }
    .ol2 {
      padding: 0;
      margin: 0;
      list-style-type: upper-alpha;
      list-style-position: inside;
    }
    .ol3 {
      padding: 0;
      margin: 0;
      list-style-type: lower-alpha;
      list-style-position: inside;
    }
    .ol4 {
      padding: 0;
      margin: 0;
      list-style-type: upper-roman;
      list-style-position: inside;
    }
    .ol5 {
      padding: 0;
      margin: 0;
      list-style-type: lower-roman;
      list-style-position: inside;
    }
    .ul {
      padding: 0;
      margin: 0;
      list-style-position: inside;
    }
    .listItem {
      margin: 0 32px;
    }
    .listItemChecked,
    .listItemUnchecked {
      position: relative;
      margin-left: 8px;
      margin-right: 8px;
      padding-left: 24px;
      padding-right: 24px;
      list-style-type: none;
      outline: none;
    }
    .listItemChecked {
      text-decoration: line-through;
    }
    .listItemUnchecked:before,
    .listItemChecked:before {
      content: '';
      width: 16px;
      height: 16px;
      top: 2px;
      left: 0;
      cursor: pointer;
      display: block;
      background-size: cover;
      position: absolute;
    }
    .listItemUnchecked[dir='rtl']:before,
    .listItemChecked[dir='rtl']:before {
      left: auto;
      right: 0;
    }
    .listItemUnchecked:focus:before,
    .listItemChecked:focus:before {
      box-shadow: 0 0 0 2px #a6cdfe;
      border-radius: 2px;
    }
    .listItemUnchecked:before {
      border: 1px solid #999;
      border-radius: 2px;
    }
    .listItemChecked:before {
      border: 1px solid rgb(61, 135, 245);
      border-radius: 2px;
      background-color: #3d87f5;
      background-repeat: no-repeat;
    }
    .listItemChecked:after {
      content: '';
      cursor: pointer;
      border-color: #fff;
      border-style: solid;
      position: absolute;
      display: block;
      top: 6px;
      width: 3px;
      left: 7px;
      right: 7px;
      height: 6px;
      transform: rotate(45deg);
      border-width: 0 2px 2px 0;
    }
    .nestedListItem {
      list-style-type: none;
    }
    .nestedListItem:before,
    .nestedListItem:after {
      display: none;
    }
    .tokenComment {
      color: slategray;
    }
    .tokenPunctuation {
      color: #999;
    }
    .tokenProperty {
      color: #905;
    }
    .tokenSelector {
      color: #690;
    }
    .tokenOperator {
      color: #9a6e3a;
    }
    .tokenAttr {
      color: #07a;
    }
    .tokenVariable {
      color: #e90;
    }
    .tokenFunction {
      color: #dd4a68;
    }
    .mark {
      background: rgba(255, 212, 0, 0.14);
      border-bottom: 2px solid rgba(255, 212, 0, 0.3);
      padding-bottom: 2px;
    }
    .markOverlap {
      background: rgba(255, 212, 0, 0.3);
      border-bottom: 2px solid rgba(255, 212, 0, 0.7);
    }
    .mark.selected {
      background: rgba(255, 212, 0, 0.5);
      border-bottom: 2px solid rgba(255, 212, 0, 1);
    }
    .markOverlap.selected {
      background: rgba(255, 212, 0, 0.7);
      border-bottom: 2px solid rgba(255, 212, 0, 0.7);
    }
    .embedBlock {
      user-select: none;
    }
    .embedBlockFocus {
      outline: 2px solid rgb(60, 132, 244);
    }
  }
`
