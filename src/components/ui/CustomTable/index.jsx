// https://ant.design/components/table

import { useEffect, useMemo, useState } from 'react'

import { Table, Select } from 'antd'

import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'
import { ModalPersonColumn } from '@components/ui/CustomTable/PersonColumn'
import {
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconArrowDown,
  IconArrowUp,
  IconSettings
} from '@tabler/icons-react'
import PropTypes from 'prop-types'

import mergeLocaleValues from '@utils/antLocale'
import { numberFormat } from '@utils/formatter'

import Sortable from './Sortable'
import SortableRow from './SortableRow'

const buttonGrid = (grid, style) => {
  return (
    <>
      {grid && (
        <div className={`flex items-center gap-2 leading-none ${style}`}>
          {grid}
        </div>
      )}
    </>
  )
}

export default function CustomTable({
  rowKey = 'id',
  data,
  columns,
  sticky = false,
  totalLabel = '총 조회결과',
  totalUnit = '건',
  total,
  totalEtc,
  page,
  pageSize,
  onChangePage,
  onChangePageSize,
  topToolbarActions = {},
  sortType,
  sortList,
  onChangeSortType,
  isPersonColumn = false,
  personColumn = [],
  onChangePersonColumn,
  isPanel = true,
  sortable = false,
  selectedRows,
  isRowSwap,
  ...rest
}) {
  const [tableData, setTableData] = useState([])
  const pageSizeOptions = [10, 20, 50, 100, 200]

  const onChangePaginationPage = page => {
    onChangePage(page)
  }
  const onChangePaginationPageSize = (current, pageSize) => {
    onChangePage(current)
    onChangePageSize(pageSize)
  }

  const pagination = useMemo(() => {
    if (page) {
      return {
        pageSizeOptions,
        total,
        pageSize,
        showSizeChanger: pageSize && page,
        current: page,
        onChange: onChangePaginationPage,
        onShowSizeChange: onChangePaginationPageSize,
        size: 'large',
        style: { marginBottom: 0 }
      }
    }
    return false
  }, [page, pageSize, total])

  const showColumns = useMemo(() => {
    if (isPersonColumn) {
      const arr = personColumn.map(key => ({
        ...columns.find(item => item.dataIndex === key),
        fixed: false
      }))
      return [...columns.filter(item => item.dataIndex === 'rowIndex'), ...arr]
    } else {
      return columns
    }
  }, [personColumn])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const sortableComponent = sortable
    ? { components: { body: { row: SortableRow } } }
    : {}

  const isTop = useMemo(() => {
    return (
      topToolbarActions.prefix ||
      topToolbarActions.infix ||
      topToolbarActions.suffix ||
      total ||
      sortList ||
      pagination
    )
  }, [])

  const wrapClass = isPanel ? '' : 'w-[100%] py-1 px-0 border-none'

  useEffect(() => {
    setTableData(data)
  }, [data])

  const handleMove = direction => {
    const newData = [...tableData]
    const selectedIds = selectedRows.map(row => row.id)

    const moveIndex = (currentIndex, newIndex) => {
      newData.splice(newIndex, 0, newData.splice(currentIndex, 1)[0])
    }

    const canMoveUp = selectedIndex => {
      return (
        selectedIndex > 0 &&
        !selectedIds.includes(newData[selectedIndex - 1].id)
      )
    }

    const canMoveDown = selectedIndex => {
      return (
        selectedIndex < newData.length - 1 &&
        !selectedIds.includes(newData[selectedIndex + 1].id)
      )
    }

    const moveUp = selectedIndex => {
      moveIndex(selectedIndex, selectedIndex - 1)
    }

    const moveDown = selectedIndex => {
      moveIndex(selectedIndex, selectedIndex + 1)
    }

    const moveTop = (selectedIndex, minIndex) => {
      moveIndex(selectedIndex, selectedIndex - minIndex)
    }

    const moveBottom = (selectedIndex, maxIndex) => {
      moveIndex(selectedIndex, selectedIndex + (newData.length - 1 - maxIndex))
    }

    const getSelectedRowIndex = (selectedId, newData) => {
      return newData.findIndex(row => row.id === selectedId)
    }

    if (direction === 'up') {
      for (let i = 0; i < selectedIds.length; i++) {
        const selectedId = selectedIds[i]
        const selectedIndex = getSelectedRowIndex(selectedId, newData)

        if (canMoveUp(selectedIndex)) {
          moveUp(selectedIndex)
        }

        if (selectedIndex === 0) {
          return // 최상단에 도달한 경우 처리 중단
        }
      }
    } else if (direction === 'down') {
      for (let i = selectedIds.length - 1; i >= 0; i--) {
        const selectedId = selectedIds[i]
        const selectedIndex = getSelectedRowIndex(selectedId, newData)

        if (canMoveDown(selectedIndex)) {
          moveDown(selectedIndex)
        }

        if (selectedIndex === newData.length - 1) {
          return // 최하단에 도달한 경우 처리 중단
        }
      }
    } else if (direction === 'top') {
      const minIndex = Math.min(
        ...selectedRows.map(row => getSelectedRowIndex(row.id, newData))
      )

      if (minIndex > 0) {
        for (let i = 0; i < selectedIds.length; i++) {
          const selectedId = selectedIds[i]
          const selectedIndex = getSelectedRowIndex(selectedId, newData)
          moveTop(selectedIndex, minIndex)
        }
      }
    } else if (direction === 'bottom') {
      const maxIndex = Math.max(
        ...selectedRows.map(row => getSelectedRowIndex(row.id, newData))
      )

      if (maxIndex < newData.length - 1) {
        for (let i = selectedIds.length - 1; i >= 0; i--) {
          const selectedId = selectedIds[i]
          const selectedIndex = getSelectedRowIndex(selectedId, newData)
          moveBottom(selectedIndex, maxIndex)
        }
      }
    }

    setTableData(newData)
  }

  return (
    <ContentPanel className={wrapClass}>
      {isTop && (
        <section className="flex flex-wrap justify-between items-end gap-4 mb-2.5 leading-none">
          {buttonGrid(
            topToolbarActions.prefix,
            total === undefined && !isRowSwap ? '' : 'w-[100%]'
          )}
          {total !== undefined && (
            <div className="flex flex-wrap items-end gap-1">
              <p>
                {totalLabel}&nbsp;
                <span className="text-base text-red-600 leading-none">
                  {numberFormat(total)}
                </span>
                {totalUnit}
              </p>
              {totalEtc}
            </div>
          )}
          {isRowSwap && (
            <div className="flex flex-wrap gap-1">
              <CustomButton
                icon={<IconArrowUp />}
                onClick={() => {
                  handleMove('up')
                }}
              />
              <CustomButton
                icon={<IconArrowDown />}
                onClick={() => {
                  handleMove('down')
                }}
              />
              <CustomButton
                icon={<IconArrowBarToUp />}
                onClick={() => {
                  handleMove('top')
                }}
              />
              <CustomButton
                icon={<IconArrowBarToDown />}
                onClick={() => {
                  handleMove('bottom')
                }}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-end items-center gap-2 leading-none">
            {buttonGrid(topToolbarActions.infix)}
            {sortList && (
              <Select
                value={sortType}
                options={sortList}
                onChange={onChangeSortType}
                style={{ width: 150 }}
              />
            )}
            {pagination && (
              <Select
                value={pagination.pageSize}
                options={pageSizeOptions.map(p => ({
                  value: p,
                  label: `${p} ${mergeLocaleValues.Pagination.items_per_page}`
                }))}
                onChange={value => {
                  onChangePaginationPageSize(1, value)
                }}
                style={{ width: 115 }}
              />
            )}
            {buttonGrid(topToolbarActions.suffix)}
            {isPersonColumn && (
              <CustomButton
                icon={<IconSettings />}
                onClick={() => {
                  setIsModalOpen(true)
                }}
              />
            )}
          </div>
        </section>
      )}

      <Table
        {...sortableComponent}
        size={'middle'}
        rowKey={rowKey}
        tableLayout="fixed"
        dataSource={tableData}
        columns={showColumns}
        pagination={pagination}
        sticky={sticky ? { offsetHeader: 64 } : false}
        bordered
        {...rest}
      />

      {isPersonColumn && (
        <ModalPersonColumn
          open={isModalOpen}
          setOpen={setIsModalOpen}
          column={columns.filter(item => item.dataIndex !== 'rowIndex')}
          personColumn={personColumn}
          onSubmit={onChangePersonColumn}
        />
      )}
    </ContentPanel>
  )
}

CustomTable.Sortable = Sortable

CustomTable.propTypes = {
  rowKey: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  sticky: PropTypes.bool,
  totalLabel: PropTypes.string,
  totalUnit: PropTypes.string,
  total: PropTypes.number,
  totalEtc: PropTypes.node,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  topToolbarActions: PropTypes.object,
  sortType: PropTypes.string,
  sortList: PropTypes.array,
  onChangeSortType: PropTypes.func,
  isPersonColumn: PropTypes.bool,
  personColumn: PropTypes.array,
  onChangePersonColumn: PropTypes.func,
  isPanel: PropTypes.bool,
  sortable: PropTypes.bool,
  selectedRows: PropTypes.array,
  isRowSwap: PropTypes.bool
}
