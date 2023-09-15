import { useEffect, useState } from 'react'

import '@assets/css/ckeditor.css'
import Editor from '@components/editor/index.ckeditor'
import ContentPanel from '@components/ui/ContentPanel'

export function EditorGuide() {
  const [source, setSource] = useState('')
  useEffect(() => {
    console.log({ source })
  }, [source])
  return (
    <ContentPanel>
      {/* <CustomEditor data={source} /> */}
      <Editor
        data={source}
        onChange={setSource}
      />
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: source }}
      />
    </ContentPanel>
  )
}
