import { i18nAddResources, i18nChangeLanguage } from '@wangeditor/editor'

const wangI18n = () => {
  i18nAddResources('ko', {
    // header
    header: {
      title: '제목',
      text: '제목'
    },
    blockQuote: {
      title: '인용 단락'
    },
    codeBlock: {
      title: '코드'
    },
    color: {
      bgColor: '배경색',
      clear: '배경색 지우기',
      color: '텍스트 색상',
      default: '텍스트 색상 지우기'
    },
    common: {
      delete: '삭제',
      ok: '확인'
    },
    divider: {
      title: '구분선'
    },
    editor: {
      image: '이미지',
      indent: '들여쓰기',
      // justify: ''
      more: '더보기',
      video: '영상'
    },
    emotion: {
      title: '이모지'
    },
    fontFamily: {
      default: '글꼴',
      title: '글꼴'
    },
    fontSize: {
      default: '글자 크기',
      title: '글자 크기'
    },
    fullScreen: {
      title: '전체 화면 보기'
    },
    image: {
      delete: '이미지 삭제',
      desc: '설명',
      edit: '이미지 정보 변경',
      link: '링크 연결',
      netImage: 'Url로 가져오기',
      src: '이미지 경로',
      viewLink: '링크 열기'
    },
    indent: {
      decrease: '내어쓰기',
      increase: '들여쓰기'
    },
    justify: {
      left: '왼쪽 맞춤',
      right: '오른쪽 맞춤',
      center: '가운데 맞춤',
      justify: '양쪽 맞춤'
    },
    lineHeight: {
      default: '기본 줄 간격',
      title: '줄 간격'
    },
    link: {
      edit: '링크 수정',
      insert: '링크 추가',
      text: '링크 텍스트',
      unLink: '랑크 제거',
      url: '링크 주소',
      view: '링크 보기'
    },
    listModule: {
      unOrderedList: '글머리 기호',
      orderedList: '번호 매기기'
    },
    tableModule: {
      deleteCol: '열 삭제',
      deleteRow: '행 삭제',
      deleteTable: '테이블 삭제',
      header: '해더 지정',
      insertCol: '열 추가',
      insertRow: '행 추가',
      insertTable: '테이블 추가',
      widthAuto: '자동 너비'
    },
    textStyle: {
      bold: '굵게',
      clear: '서식 제거',
      code: '코드 추가',
      italic: '기울임',
      sub: '아래 첨자',
      sup: '윗 첨자',
      through: '취소선',
      underline: '밑줄'
    },
    todo: {
      todo: '체크리스트'
    },
    undo: {
      undo: '실행취소',
      redo: '재실행'
    },
    uploadImgModule: {
      uploadImage: '이미지 업로드',
      uploadError: '{{fileName}} 업로드 실패'
    },
    videoModule: {
      delete: '삭제',
      uploadVideo: '영상 업로드',
      insertVideo: '영상 삽입',
      videoSrc: '영상 소스',
      videoSrcPlaceHolder: '영상 파일 Url 또는 youtube <iframe>',
      width: '너비',
      videoPoster: '영상 이미지',
      videoPosterPlaceHolder: '영상 이미지 Url',
      ok: '확인'
    }

    // ... other words config ...
  })
  i18nChangeLanguage('ko')
}

export { wangI18n }
