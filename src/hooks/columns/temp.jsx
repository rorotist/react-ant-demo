import { cellFormatter, cellKeyPath } from '@utils/columns'
import { useTableColumn } from '@hooks/useTableColumn'

export const useTempColumns = ({ path, sortedInfo }) => {
  const { orderKey } = useTableColumn(sortedInfo)

  return {
    id: {
      dataIndex: cellKeyPath('id', path),
      title: '번호',
      width: 60,
      fixed: 'left'
    },
    name: {
      dataIndex: cellKeyPath('name', path),
      key: 'name',
      title: '상품명',
      ...orderKey('name')
    },
    code: {
      dataIndex: cellKeyPath('code', path),
      key: 'code',
      title: '상품코드',
      ...orderKey('code')
    },
    state: {
      dataIndex: cellKeyPath('state', path),
      title: '이메일'
    },
    salesPeriod: {
      dataIndex: cellKeyPath('salesPeriod', path),
      title: '판매기간',
      Cell: cellFormatter.date
    },
    isDisplay: {
      dataIndex: cellKeyPath('isDisplay', path),
      title: '노출상태',
      render: text => cellFormatter.boolean(text, ['노출', '비노출'])
    },
    price: {
      dataIndex: cellKeyPath('price', path),
      title: '판매가',
      Cell: cellFormatter.number
    },
    option: {
      dataIndex: cellKeyPath('option', path),
      title: '옵션',
      render: text => cellFormatter.boolean(text, ['단품', '옵션사용'])
    },
    inventory: {
      dataIndex: cellKeyPath('inventory', path),
      title: '재고수량',
      enableColumnFilter: false,
      render: text => cellFormatter.number(text)
    },
    brand: {
      dataIndex: cellKeyPath('brand', path),
      title: '브랜드'
    },
    modifiedName: {
      dataIndex: cellKeyPath('modifiedName', path),
      title: '수정자'
    }
  }
}
