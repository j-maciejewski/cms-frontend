import { useReactiveVar } from '@apollo/client'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import { $createParagraphNode, $createTextNode, $getRoot, $insertNodes } from 'lexical'
import { debounce } from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Prompt } from 'react-router'

// import { saveToEditorsIDB } from '@/utils';
import { EMPTY_EDITOR_HTML, RESET_EDITOR_KEYWORD } from '@/consts'

import { ILexicalEditor } from '.'
// import { isEditorSaved } from '@/client/cache'
import { useSettings } from './context/SettingsContext'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
import TableCellNodes from './nodes/TableCellNodes'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import CollapsiblePlugin from './plugins/CollapsiblePlugin'
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import ContextMenuPlugin from './plugins/ContextMenuPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin'
import TabFocusPlugin from './plugins/TabFocusPlugin'
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin'
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin'
import { EditorContainer, EditorScroller, Wrapper } from './styled'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'
import { CAN_USE_DOM } from './utils/canUseDOM'

export default function Editor(props: ILexicalEditor): JSX.Element {
  const {
    value,
    onChange,
    isEditing = false,
    isDisabled = false,
    uploadImages,
    autoSaveKey,
    dataTestId,
    initialValue,
    quoteContent,
  } = props

  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
    },
  } = useSettings()
  const isEditable = useLexicalEditable()
  const placeholder = <Placeholder>Add content...</Placeholder>
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener('resize', updateViewPortWidth)

    return () => {
      window.removeEventListener('resize', updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  const [editor] = useLexicalComposerContext()

  // const shouldDisplayPrompt = !useReactiveVar(isEditorSaved)

  // const currentContent = useRef(value)
  // const lastAutoSavedContent = useRef('')

  // const debouncedAutoSave = useMemo(
  //   () =>
  //     debounce((contentHtml: string) => {
  //       if (
  //         !contentHtml ||
  //         contentHtml === EMPTY_EDITOR_HTML ||
  //         contentHtml === lastAutoSavedContent.current
  //       )
  //         return;

  //       lastAutoSavedContent.current = contentHtml;

  //       saveToEditorsIDB({ contentHtml, key: autoSaveKey });
  //     }, 2500),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [],
  // );

  const handleChange = () => {
    // isEditorSaved(false);
    // editor.update(() => {
    //   const editorState = editor.getEditorState();
    //   const contentHtml = $generateHtmlFromNodes(editor);
    //   currentContent.current = contentHtml;
    //   if (autoSaveKey !== undefined) {
    //     debouncedAutoSave(contentHtml);
    //   }
    //   if (onChange) onChange(editor, editorState);
    // });
  }

  useEffect(() => {
    if (!value) return

    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(value, 'text/html')

      const nodes = $generateNodesFromDOM(editor, dom)

      $getRoot().select()

      $insertNodes(nodes)
    })
  }, [])

  useEffect(() => {
    if (value !== RESET_EDITOR_KEYWORD) return

    editor.update(() => {
      const root = $getRoot()
      root.clear()

      const parser = new DOMParser()
      const dom = parser.parseFromString(initialValue, 'text/html')

      const nodes = $generateNodesFromDOM(editor, dom)

      root.select()

      $insertNodes(nodes)
    })
  }, [value])

  // useEffect(() => {
  // if (!quoteContent) return;

  // editor.update(() => {
  //   const root = $getRoot();
  //   root.clear();

  //   const header = `<p class="paragraph" dir="ltr"><strong class="textBold textItalic" data-lexical-text="true">${
  //     quoteContent.author
  //   } ${intl.formatMessage({ defaultMessage: 'napisał/a' })}:</strong></p>`;

  //   let parsedContent = header + quoteContent.contentHtml;

  //   parsedContent = parsedContent
  //     .replace('<p class="paragraph"', '<blockquote class="quote"')
  //     .replace('</p>', '</blackqoute>');

  //   const parser = new DOMParser();
  //   const dom = parser.parseFromString(parsedContent, 'text/html');

  //   const nodes = $generateNodesFromDOM(editor, dom);

  //   $insertNodes(nodes);

  //   const paragraphNode = $createParagraphNode();
  //   const textNode = $createTextNode('');
  //   paragraphNode.append(textNode);
  //   root.append(paragraphNode);

  //   root.select();
  //   });
  // }, [quoteContent]);

  useEffect(() => {
    editor.setEditable(isEditing)
  }, [isEditing])

  // const checkForUnsavedData = () => {
  //   return (
  //     historyState?.undoStack !== undefined &&
  //     historyState?.undoStack.length > 0 &&
  //     currentContent.current !== EMPTY_EDITOR_HTML &&
  //     shouldDisplayPrompt
  //   );
  // };

  // useEffect(() => {
  //   const handler = (event: BeforeUnloadEvent) => {
  //     if (checkForUnsavedData()) {
  //       event.preventDefault();
  //       event.returnValue = '';
  //     }
  //   };

  //   window.addEventListener('beforeunload', handler);

  //   return () => {
  //     window.removeEventListener('beforeunload', handler);
  //   };
  // }, [value, shouldDisplayPrompt]);

  return (
    <Wrapper>
      {/* <Prompt
        when={checkForUnsavedData()}
        message={intl.formatMessage({
          defaultMessage: 'Czy na pewno chcesz opuścić stronę?',
        })}
      /> */}
      {isRichText && isEditing && <ToolbarPlugin />}
      <div className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''}`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <HashtagPlugin />
        <AutoLinkPlugin />
        <OnChangePlugin onChange={handleChange} />
        {isRichText ? (
          <>
            <HistoryPlugin externalHistoryState={historyState} />
            <RichTextPlugin
              contentEditable={
                <EditorScroller isEditing={isEditing}>
                  <EditorContainer isEditing={isEditing} isDisabled={isDisabled} data-testid={dataTestId} ref={onRef}>
                    <ContentEditable isEditing={isEditing} />
                  </EditorContainer>
                </EditorScroller>
              }
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={3} />
            <NewTablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={<ContentEditable isEditing={isEditing} className="TableNode__contentEditable" />}
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <ImagesPlugin uploadImages={uploadImages} />
              <LinkPlugin />
              <LexicalClickableLinkPlugin />
            </NewTablePlugin>
            <ImagesPlugin uploadImages={uploadImages} />
            {/* <InlineImagePlugin uploadImages={uploadImages} /> */}
            <LinkPlugin />
            {!isEditable && <LexicalClickableLinkPlugin />}
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable editable={isEditing} />}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} maxLength={5} />
        )}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
      </div>
      {showTreeView && <TreeViewPlugin />}
    </Wrapper>
  )
}
