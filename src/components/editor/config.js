import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js'
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js'
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js'
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed.js'
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js'
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js'
import Image from '@ckeditor/ckeditor5-image/src/image.js'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js'
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js'
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js'
import Link from '@ckeditor/ckeditor5-link/src/link.js'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js'
import List from '@ckeditor/ckeditor5-list/src/list.js'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js'
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js'
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting'
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js'
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js'
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js'
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js'
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js'
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js'
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js'
import Table from '@ckeditor/ckeditor5-table/src/table.js'
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js'
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js'
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import {
  Emoji,
  EmojiActivity,
  EmojiFlags,
  EmojiFood,
  EmojiNature,
  EmojiObjects,
  EmojiPeople,
  EmojiPlaces,
  EmojiSymbols
} from '@phudak/ckeditor5-emoji/src'
// 언어파일
import '@constants/editorLocale'
export const editorConfig = {
  plugins: [
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    BlockQuote,
    Bold,
    Paragraph,
    Bold,
    Italic,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FindAndReplace,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    FileRepository,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    MediaEmbed,
    MediaEmbedToolbar,
    Paragraph,
    PasteFromOffice,
    Emoji,
    EmojiActivity,
    EmojiFlags,
    EmojiFood,
    EmojiNature,
    EmojiObjects,
    EmojiPeople,
    EmojiPlaces,
    EmojiSymbols,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    SourceEditing
  ],
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      'findAndReplace',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      // '-', 행 구분
      'fontFamily',
      'fontSize',
      'alignment',
      '|',
      'fontBackgroundColor',
      'fontColor',
      'highlight',
      'horizontalLine',
      '|',
      'htmlEmbed',
      'emoji',
      'specialCharacters',
      'strikethrough',
      'underline',
      'imageInsert',
      'sourceEditing'
    ],
    shouldNotGroupWhenFull: true
  },
  language: 'ko',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties'
    ]
  },
  removePlugins: ['MediaEmbedToolbar'],
  extraPlugins: [uploadPlugin]
}
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return customUploadAdapter(loader)
  }
}
const customUploadAdapter = loader => {
  // (2)
  return {
    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData()
        console.log('🚀 ~ file: config.js:208 ~ returnnewPromise ~ data:', data)
        loader.file.then(file => {
          console.log({ adapter: file, data })
        })
      })
    }
  }
}
