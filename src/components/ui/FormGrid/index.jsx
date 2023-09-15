import { useParams } from 'react-router-dom'

import { Form } from 'antd'

import CustomButton from '@components/ui/CustomButton'
import PropTypes from 'prop-types'

import FormGridColumn from './Column'
import FormGridGroup from './Group'
import FormGridItem from './Item'
import FormGridSearch from './Search'
import FormGridSection from './Section'

const FormGrid = ({
  children,
  onSubmit,
  onDelete,
  goList,
  /* 기본버튼(목록,저장,삭제) 외 영역 */
  prefix,
  infix,
  suffix,
  /* 기본버튼(목록,저장,삭제) display 여부 */
  isListButton = true,
  isSaveButton = true,
  isDeleteButton = true,
  /* 기본버튼(목록,저장,삭제) disabled */
  saveDisabled = false,
  deleteDisabled = false,
  /* 기본버튼(목록,저장,삭제) loading */
  saveLoading = false,
  deleteLoading = false,
  /* 기본버튼(목록,저장,삭제) text */
  actionsText = {},
  isBottomBar = true,
  ...props
}) => {
  let { id } = useParams()
  const actionsLabel = Object.assign(
    {
      list: '목록',
      edit: '수정',
      save: '저장',
      delete: '삭제'
    },
    actionsText
  )

  return (
    <>
      <Form
        onFinish={onSubmit}
        className={'flex-1 flex flex-col justify-between'}
        {...props}
      >
        <div>{children}</div>
        {isBottomBar && (
          <div
            className={
              'flex flex-wrap justify-between gap-2 sticky bottom-0 -m-6 mt-6 px-6 py-4 z-10 backdrop-blur-sm bg-white/60 border-solid border-0 border-t border-t-gray-200'
            }
          >
            <div className={'inline-flex flex-wrap  items-center gap-2'}>
              {isListButton && goList && (
                <CustomButton
                  onClick={goList}
                  label={actionsLabel.list}
                />
              )}
              {prefix}
            </div>
            <div className={'inline-flex flex-wrap items-center gap-2'}>
              {infix}
              {isSaveButton && (
                <CustomButton
                  type={'primary'}
                  disabled={saveDisabled}
                  htmlType="submit"
                  label={id ? actionsLabel.edit : actionsLabel.save}
                  loading={saveLoading}
                />
              )}
              {id && isDeleteButton && (
                <CustomButton
                  color="red"
                  disabled={deleteDisabled}
                  onClick={onDelete}
                  label={actionsLabel.delete}
                  loading={deleteLoading}
                />
              )}
              {suffix}
            </div>
          </div>
        )}
      </Form>
    </>
  )
}

FormGrid.propTypes = {
  children: PropTypes.node,
  actionsText: PropTypes.object,
  actionsDisabled: PropTypes.object,
  prefix: PropTypes.node,
  infix: PropTypes.node,
  suffix: PropTypes.node,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  goList: PropTypes.func,
  /* 저장 삭제 버튼 props */
  isListButton: PropTypes.bool,
  isSaveButton: PropTypes.bool,
  isDeleteButton: PropTypes.bool,
  saveDisabled: PropTypes.bool,
  deleteDisabled: PropTypes.bool,
  saveLoading: PropTypes.bool,
  deleteLoading: PropTypes.bool,
  isBottomBar: PropTypes.bool
}

FormGrid.Group = FormGridGroup
FormGrid.Section = FormGridSection
FormGrid.Column = FormGridColumn
FormGrid.Item = FormGridItem
FormGrid.Search = FormGridSearch

export default FormGrid
