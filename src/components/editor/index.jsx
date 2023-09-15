import { useState, useEffect } from 'react'

import { Editor, Toolbar } from '@wangeditor/editor-for-react'

import '@wangeditor/editor/dist/css/style.css' // import css
import { wangI18n } from './i18n'
wangI18n()
function CustomEditor({ data }) {
  // editor instance
  const [editor, setEditor] = useState(null)

  // editor content
  const [html, setHtml] = useState()

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: ''
  }

  // Timely destroy editor, important!
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(() => {
    setHtml(data)
  }, [data])

  return (
    <>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        className="border border-solid border-gray-300"
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={editor => setHtml(editor.getHtml())}
        mode="default"
        style={{
          height: '500px',
          overflowY: 'hidden',
          borderLeft: '1px solid #dadada',
          borderRight: '1px solid #dadada',
          borderBottom: '1px solid #dadada'
        }}
      />
    </>
  )
}

export default CustomEditor
