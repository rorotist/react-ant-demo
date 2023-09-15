import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutContext } from '@components/layout/context/LayoutContext'
import {
  IconMenu2,
  IconArrowBigLeft,
  IconArrowBigRight
} from '@tabler/icons-react'
import { Dropdown, Button, Avatar } from 'antd'
import PropTypes from 'prop-types'
import useAuth from '@/hooks/useAuth'

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
const getRandomEmoji = () => {
  const emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '🫠',
    '😉',
    '😊',
    '😇',
    '🥰',
    '😍',
    '🤩',
    '😘',
    '😗',
    '☺',
    '😚',
    '😙',
    '🥲',
    '😋',
    '😛',
    '😜',
    '🤪',
    '😝',
    '🤑',
    '🤗',
    '🤭',
    '🫢',
    '🫣',
    '🤫',
    '🤔',
    '🫡',
    '🤐',
    '🤨',
    '😐',
    '😑',
    '😶',
    '🫥',
    '😶‍🌫️',
    '😏',
    '😒',
    '🙄',
    '😬',
    '😮‍💨',
    '🤥',
    '😌',
    '😔',
    '😪',
    '🤤',
    '😴',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '🥵',
    '🥶',
    '🥴',
    '😵',
    '😵‍💫',
    '🤯',
    '🤠',
    '🥳',
    '🥸',
    '😎',
    '🤓',
    '🧐',
    '😕',
    '🫤',
    '😟',
    '🙁',
    '☹',
    '😮',
    '😯',
    '😲',
    '😳',
    '🥺',
    '🥹',
    '😦',
    '😧',
    '😨',
    '😰',
    '😥',
    '😢',
    '😭',
    '😱',
    '😖',
    '😣',
    '😞',
    '😓',
    '😩',
    '😫',
    '🥱',
    '😤',
    '😡',
    '😠',
    '🤬',
    '😈',
    '👿',
    '💀',
    '☠',
    '💩',
    '🤡',
    '👹',
    '👺',
    '👻',
    '👽'
  ]

  return emojis[~~(Math.random() * emojis.length)]
}

const LayoutTop = ({ isBreak }) => {
  const navigate = useNavigate()

  const { onLogOut } = useAuth()
  const { setMobileSideOpen, sideCollapsed, setSideCollapsed } =
    useContext(LayoutContext)

  const [avatarBg] = useState(getRandomColor())

  const items = [
    {
      key: 'logout',
      label: (
        <a
          onClick={() => {
            onLogOut()
            navigate('/auth/login')
          }}
        >
          로그아웃
        </a>
      )
    }
  ]

  return (
    <div
      className={
        'flex justify-between items-center gap-4 h-[100%] px-4 leading-none'
      }
    >
      <div className={'flex items-center'}>
        {isBreak && (
          <Button
            type="text"
            shape="circle"
            block
            className={'inline-flex items-center justify-center'}
            onClick={() => setMobileSideOpen(o => !o)}
          >
            <IconMenu2
              className={'text-gray-600'}
              size={'1.4em'}
            />
          </Button>
        )}
        <div className={'absolute -left-[16px]'}>
          {!isBreak && (
            <Button
              shape="circle"
              className={
                'inline-flex items-center justify-center border-none shadow-lg'
              }
              icon={
                sideCollapsed ? (
                  <IconArrowBigRight size={'1.2em'} />
                ) : (
                  <IconArrowBigLeft size={'1.2em'} />
                )
              }
              onClick={() => setSideCollapsed(o => !o)}
            />
          )}
        </div>
      </div>
      <div className={'leading-none'}>
        <Dropdown
          menu={{
            items
          }}
          placement="bottomRight"
        >
          <Avatar
            style={{
              background: avatarBg,
              verticalAlign: 'middle'
            }}
            size="large"
          >
            {getRandomEmoji()}
          </Avatar>
        </Dropdown>
      </div>
    </div>
  )
}

LayoutTop.propTypes = {
  isBreak: PropTypes.bool
}

export default LayoutTop
