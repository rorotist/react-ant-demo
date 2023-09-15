import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Form } from 'antd'

const { useForm } = Form
const removeNull = obj => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => ![null, undefined, ''].includes(value))
      .map(([key, value]) => [
        key,
        value === Object(value) ? removeNull(value) : value
      ])
  )
}

const useSearchForm = ({
  initialSortType = null,
  initialPagination = { page: 1, pageSize: 10 },
  initialValues = {},
  initialSortedInfo = [],
  isKeepSearch = true
}) => {
  const [isDone, setIsDone] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const [filterForm] = useForm()
  const [searchForm, setSearchForm] = useState({ ...initialValues })

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(initialPagination.page)
  const [pageSize, setPageSize] = useState(initialPagination.pageSize)

  const [sortType, setSortType] = useState(initialSortType)
  const [sortedInfo, setSortedInfo] = useState(initialSortedInfo)

  /* table update */
  const onSorterChange = sorter => {
    const change = sorter.length ? sorter : [sorter]

    const sort = sortedInfo.map(item => {
      const find = change.find(i => i.columnKey === item.columnKey)
      return {
        ...item,
        order: find ? find.order : null
      }
    })
    setSortedInfo([...sort])
  }

  /* search params update  */
  const onSetSearchParams = ({ page, pageSize, filter }) => {
    if (isKeepSearch) {
      const sort = {}

      const order = sortedInfo.filter(item => !!item.order)
      if (initialSortType === null && order && order.length) {
        sort.sortedInfo = JSON.stringify(order)
      } else if (sortType) {
        sort.sortType = sortType
      }

      const params = {
        page,
        pageSize,
        filter: Object.keys(filter).length ? JSON.stringify(filter) : null,
        ...sort
      }
      setSearchParams(removeNull(params))
    }
  }

  /* filter form 검색/리셋 */
  const onSearch = () => {
    onSetSearchParams({
      page: initialPagination.page,
      pageSize: pageSize,
      filter: removeNull(filterForm.getFieldsValue(true))
    })

    setSearchForm(filterForm.getFieldsValue(true))
    setPage(initialPagination.page)
  }
  const onReset = () => {
    onSetSearchParams({
      page: initialPagination.page,
      pageSize: pageSize,
      filter: removeNull(initialValues)
    })

    setPage(initialPagination.page)
    setSearchForm({ ...initialValues })

    filterForm.resetFields()
  }

  /* filter form 제외 업데이트: page, pageSize, sort */
  const onSearchParamsUpdate = type => {
    onSetSearchParams({
      page: type !== 'page' ? initialPagination.page : page,
      pageSize: pageSize,
      filter: removeNull(searchForm)
    })
  }

  /* 변화감지: page, pageSize, sort */
  useEffect(() => {
    isDone && onSearchParamsUpdate('page')
  }, [page])
  useEffect(() => {
    isDone && onSearchParamsUpdate('pageSize')
  }, [pageSize])
  useEffect(() => {
    isDone && onSearchParamsUpdate('sort')
  }, [sortType, sortedInfo])

  /* search params가 있을 때(초기값 셋팅) */
  useEffect(() => {
    if (isKeepSearch) {
      const paramsFilter = searchParams.get('filter')
      if (paramsFilter && typeof paramsFilter !== 'object') {
        const filterValue = Object.assign(
          initialValues,
          JSON.parse(paramsFilter)
        )
        setSearchForm({ ...filterValue })
        filterForm.setFieldsValue({ ...filterValue })
      }

      const sortedInfo = searchParams.get('sortedInfo')
      if (sortedInfo && typeof sortedInfo !== 'object') {
        onSorterChange(JSON.parse(sortedInfo))
      }

      const page = searchParams.get('page')
      if (page) setPage(Number(page))

      const pageSize = searchParams.get('pageSize')
      if (pageSize) setPageSize(Number(pageSize))

      const sortType = searchParams.get('sortType')
      if (sortType) setSortType(sortType)
    }

    setIsDone(true)
  }, [])

  return {
    total,
    setTotal,
    setPage,
    setPageSize,
    setSortType,
    setSortedInfo,
    onSorterChange,
    /* 리스트 쿼리 호출 시 enabled */
    isDone,
    /* 리스트 쿼리 key 데이터 */
    page,
    pageSize,
    sortType,
    sortedInfo,
    searchForm,
    /* 리스트 검색 영역 데이터(버튼 누르기 전) */
    filterForm,
    onSearch,
    onReset
  }
}

export default useSearchForm
