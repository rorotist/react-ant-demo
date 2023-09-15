import { cellFormatter } from '@utils/columns'

export const useColumns = ({ page, pageSize, total }) => {
  return {
    id: {
      dataIndex: 'rowIndex',
      title: '번호',
      width: 60,
      align: 'center',
      render: (text, record, index) => {
        if (page && pageSize) {
          return total - (page - 1) * pageSize - index
        }
        return total - index
      }
    },
    sort: {
      title: '순서',
      key: 'sort',
      width: 60,
      align: 'center'
    },
    // 등록자/수정자
    createdBy: {
      dataIndex: 'createdBy',
      title: '등록자',
      width: 100,
      align: 'center',
      render: text => text || '-'
    },
    createdAt: {
      dataIndex: 'createdAt',
      title: '등록시간',
      width: 140,
      align: 'center',
      render: cellFormatter.date
    },
    modifiedBy: {
      dataIndex: 'modifiedBy',
      title: '최종수정자',
      width: 100,
      align: 'center',
      render: text => text || '-'
    },
    modifiedAt: {
      dataIndex: 'modifiedAt',
      title: '최종수정시간',
      width: 140,
      align: 'center',
      render: cellFormatter.date
    }
  }
}
