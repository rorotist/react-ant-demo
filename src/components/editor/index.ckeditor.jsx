import { useEffect, useState } from 'react'

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editorConfig } from '@components/editor/config'

import PropTypes from '@utils/PropTypes'

export default function Editor({ data, disabled, onChange }) {
  const [content, setContent] = useState()
  useEffect(() => {
    setContent(data)
  }, [data])
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      disabled={disabled}
      config={editorConfig}
      onReady={editor => {
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        setContent(data)
        onChange?.(data)
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor)
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor)
      }}
    />
  )
}

Editor.propTypes = {
  data: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}
