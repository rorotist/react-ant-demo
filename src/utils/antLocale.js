import ko_KR from 'antd/locale/ko_KR'

const typeTemplate = '유효하지 않은 ${type}입니다.'

const mergeLocaleValues = {
  ...ko_KR,
  Form: {
    optional: '(선택사항)',
    defaultValidateMessages: {
      default: '필드 유효성 검사 오류 ${label}',
      required: '필수 값 입니다.',
      enum: '${label} [${enum}] 중에 하나여야 합니다',
      whitespace: '${label} 비워둘 수 없습니다',
      date: {
        format: '${label} 유효하지 않은 날짜 형식입니다',
        parse: '${label} 날짜 형식으로 변환될 수 없습니다',
        invalid: '${label} 유효하지 않은 날짜입니다'
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: '${len}글자여야 합니다',
        min: '적어도 ${min}글자 이상이어야 합니다',
        max: '${max}글자 이하여야 합니다',
        range: '${min}-${max}글자 사이어야 합니다'
      },
      number: {
        len: '값은 ${len}이어야 합니다',
        min: '최솟값은 ${min}입니다',
        max: '최댓값은 ${max}입니다',
        range: '${min}-${max} 사이어야 합니다'
      },
      array: {
        len: '${len}이어야 합니다 ${label} ',
        min: '최소 ${min}이어야 합니다 ${label}',
        max: '최대 ${max}이어야 합니다 ${label}',
        range: '${min}-${max} 사이어야 합니다'
      },
      pattern: {
        mismatch: '${pattern} 패턴과 일치하지 않습니다'
      }
    }
  }
}

export default mergeLocaleValues
