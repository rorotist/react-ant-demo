import { useEffect, useMemo, useState } from 'react'

import CustomButton from '@components/ui/CustomButton'
import CustomTable from '@components/ui/CustomTable'
import FormGrid from '@components/ui/FormGrid'
import { useTempColumns } from '@hooks/columns/temp'

import useSearchForm from '@hooks/useSearchForm'

import mockTable from '@/mockData/mock_table.json'

const data = mockTable

export function TableGuide() {
  const [tableData] = useState(data)
  const [selectedRows, setSelectedRows] = useState([])

  const initialValues = {
    email: 'ㅇㅇㅇ'
  }

  // const initialSortedInfo = [
  //   { order: 'descend', columnKey: 'name' },
  //   { order: null, columnKey: 'code' }
  // ]

  const sortList = [
    { label: '등록시간 늦은 순', value: 'CREATE_DESC' },
    { label: '등록시간 빠른 순', value: 'CREATE_ASC' }
  ]

  const {
    filterForm,
    page,
    pageSize,
    sortType,
    sortedInfo,
    setPage,
    setPageSize,
    setSortType,
    onSearch,
    onReset,
    onSorterChange
  } = useSearchForm({
    initialSortType: 'CREATE_DESC',
    // initialSortedInfo,
    initialValues,
    initialPagination: { page: 1, pageSize: 10 }
  })

  const tempColumns = useTempColumns({ sortedInfo })
  const columns = useMemo(
    () => [
      tempColumns.id,
      tempColumns.name,
      tempColumns.code,
      tempColumns.state,
      tempColumns.isDisplay,
      tempColumns.salesPeriod,
      tempColumns.price,
      tempColumns.option,
      tempColumns.inventory,
      tempColumns.brand,
      tempColumns.modifiedName
    ],
    [sortedInfo]
  )
  const [personColumn, setPersonColumn] = useState(['id', 'name', 'isDisplay'])

  useEffect(() => {
    // setPersonColumn(columns.map(item => item.dataIndex))
  }, [])

  const topToolbarActions = {
    prefix: (
      <>
        <CustomButton>infix1</CustomButton>
        <CustomButton color="blue">prefix1</CustomButton>
        <CustomButton color="red">prefix2</CustomButton>
        <CustomButton color="orange">prefix3</CustomButton>
      </>
    ),
    infix: (
      <>
        <CustomButton color="green">prefix4</CustomButton>
        <CustomButton color={'purple'}>suffix2</CustomButton>
      </>
    ),
    suffix: (
      <>
        <CustomButton type="primary">infix2</CustomButton>
      </>
    )
  }

  const test = (pagination, filters, sorter) => {
    onSorterChange(sorter)
  }

  return (
    <>
      <FormGrid.Search
        form={filterForm}
        initialValues={initialValues}
        onSubmit={onSearch}
        onReset={onReset}
        defaultOpened={true}
        extended={
          <>
            <FormGrid.Column label={'이름'}>
              <FormGrid.Item
                component="Input"
                name={'name'}
              />
            </FormGrid.Column>
          </>
        }
      >
        <FormGrid.Column label={'default'}>
          <FormGrid.Item
            component="Input"
            name={'name'}
          />
        </FormGrid.Column>
      </FormGrid.Search>

      <CustomTable
        columns={columns}
        data={tableData}
        scroll={{
          x: personColumn.length * 150 || 1500
        }}
        rowKey="id"
        sticky
        /* sort */
        sortType={sortType}
        sortList={sortList}
        onChangeSortType={setSortType}
        /* pagination */
        // total={100}
        page={page}
        pageSize={pageSize}
        onChangePage={setPage}
        onChangePageSize={setPageSize}
        /* 테이블 상단 버튼(앞, 중간, 뒤) */
        topToolbarActions={topToolbarActions}
        /* 화면에 노출될 컬럼 정의 */
        isPersonColumn
        personColumn={personColumn}
        onChangePersonColumn={setPersonColumn}
        /* 그리드 설정: row 선택 및 위치 변경 */
        isRowSwap
        selectedRows={selectedRows}
        rowSelection={{
          selectedRowKeys: selectedRows.map(row => row.id),
          onChange: selectedRowKeys => {
            const selected = data.filter(row =>
              selectedRowKeys.includes(row.id)
            )
            setSelectedRows(selected)
          }
        }}
        /* etc: 컬럼에 각각 정렬이 될 경우 */
        onChange={test}
      />
    </>
  )
}
