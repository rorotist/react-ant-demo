import { useEffect, useMemo, useState } from 'react'

import { Modal, Select, Transfer } from 'antd'

import {
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconArrowDown,
  IconArrowUp
} from '@tabler/icons-react'
import PropTypes from 'prop-types'

import CustomButton from '../CustomButton'

const sortList = [
  { label: '기본순서', value: '' },
  { label: '가나다순', value: 'asc' }
  // { label: '가나다역순', value: 'desc' }
]

export function ModalPersonColumn({
  open,
  setOpen,
  column,
  personColumn = [],
  onSubmit
}) {
  const [sort, setSort] = useState('')

  /* transfer data value */
  const [targetKeys, setTargetKeys] = useState([])
  const [virtualTargetKeys, setVirtualTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [selectedTargetKeys, setTargetSelectedKeys] = useState([])
  const virtualDataSource = useMemo(() => {
    const originalColumn = Array.from({ length: column.length }).map(
      (_, i) => ({
        key: column[i].dataIndex,
        title: column[i].title,
        disabled: targetKeys.includes(column[i].dataIndex)
      })
    )

    if (sort) {
      originalColumn.sort((a, b) => {
        const target = [a.title, b.title]
        if (sort === 'asc') {
          return target[0] < target[1] ? -1 : target[0] === target[1] ? 0 : 1
        }
        if (sort === 'desc') {
          return target[1] < target[0] ? -1 : target[1] === target[0] ? 0 : 1
        }
      })
    }

    const data = targetKeys.map(key => {
      const item = originalColumn.find(i => i.key === key)
      return {
        key: `${key}_`,
        title: item?.title
      }
    })
    return [...originalColumn, ...data]
  }, [targetKeys, sort])

  /* transfer handle */
  const onTransferChange = nextTargetKeys => {
    const keys = nextTargetKeys.map(key => {
      if (key.indexOf('_') > -1) {
        return key.replace('_', '')
      }
      return key
    })
    setTargetKeys(keys)
    setVirtualTargetKeys(keys.map(key => `${key}_`))
  }

  const moveItems = direction => {
    const keys = [...targetKeys]
    const selectedIndices = selectedKeys.map(key =>
      virtualTargetKeys.indexOf(key)
    )
    const itemsToMove = selectedIndices.map(index => keys[index])

    selectedIndices.sort((a, b) => a - b)

    if (direction === 'up') {
      selectedIndices.forEach(index => {
        if (index > 0) {
          const item = keys.splice(index, 1)[0]
          keys.splice(index - 1, 0, item)
        }
      })
    } else if (direction === 'down') {
      selectedIndices.reverse().forEach(index => {
        if (index < keys.length - 1) {
          const item = keys.splice(index, 1)[0]
          keys.splice(index + 1, 0, item)
        }
      })
    } else if (direction === 'top') {
      itemsToMove.forEach(item => {
        keys.splice(keys.indexOf(item), 1)
      })
      keys.unshift(...itemsToMove)
    } else if (direction === 'bottom') {
      itemsToMove.forEach(item => {
        keys.splice(keys.indexOf(item), 1)
      })
      keys.push(...itemsToMove)
    }

    onTransferChange(keys)
  }
  const onTransferSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setTargetSelectedKeys([...targetSelectedKeys])
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }
  const renderFooter = (_, { direction }) => {
    if (direction === 'left') {
      return (
        <div className={'h-[27px] p-2'}>
          <Select
            value={sort}
            options={sortList}
            size={'small'}
            onChange={setSort}
            style={{ width: '100%', borderRadius: 0 }}
          />
        </div>
      )
    }
    return (
      <div className="flex justify-center items-center">
        <CustomButton
          icon={<IconArrowUp />}
          disabled={
            selectedTargetKeys.length === 0 ||
            selectedTargetKeys.includes(virtualTargetKeys[0])
          }
          onClick={() => {
            moveItems('up')
          }}
        />
        <CustomButton
          icon={<IconArrowDown />}
          onClick={() => {
            moveItems('down')
          }}
          disabled={
            selectedTargetKeys.length === 0 ||
            selectedTargetKeys.includes(
              virtualTargetKeys[virtualTargetKeys.length - 1]
            )
          }
        />
        <CustomButton
          icon={<IconArrowBarToUp />}
          onClick={() => {
            moveItems('top')
          }}
          disabled={
            selectedTargetKeys.length === 0 ||
            selectedTargetKeys.includes(virtualTargetKeys[0])
          }
        />
        <CustomButton
          icon={<IconArrowBarToDown />}
          onClick={() => {
            moveItems('bottom')
          }}
          disabled={
            selectedTargetKeys.length === 0 ||
            selectedTargetKeys.includes(
              virtualTargetKeys[virtualTargetKeys.length - 1]
            )
          }
        />
      </div>
    )
  }
  useEffect(() => {
    if (personColumn.length) {
      onTransferChange(personColumn)
    }
  }, [personColumn])

  /* save */
  const onOk = async () => {
    await onSubmit?.(targetKeys)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setSelectedKeys([])
    }
  }, [open])

  return (
    <Modal
      title="그리드 개인 설정"
      open={open}
      okText={'설정'}
      onOk={onOk}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Transfer
        dataSource={virtualDataSource}
        titles={['전체 그리드 항목', '노출 그리드 항목']}
        targetKeys={virtualTargetKeys}
        selectedKeys={selectedKeys}
        onChange={onTransferChange}
        onSelectChange={onTransferSelectChange}
        render={item => item.title}
        listStyle={{
          width: 'calc(100% - 43px)',
          height: 400
        }}
        footer={renderFooter}
      />
    </Modal>
  )
}

ModalPersonColumn.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onSubmit: PropTypes.func,
  column: PropTypes.array,
  personColumn: PropTypes.array
}
