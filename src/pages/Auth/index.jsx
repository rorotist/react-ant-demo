import { useEffect } from 'react'
import {
  Outlet,
  createSearchParams,
  useNavigate,
  useSearchParams
} from 'react-router-dom'

import { Typography } from 'antd'

import { Logo } from '@/components/ui/Logo'
import useAuth from '@/hooks/useAuth'

export default function AuthIndex() {
  const [searchParams] = useSearchParams()
  const isInvite = searchParams.get('invite')
  const isChangePassword = searchParams.get('changePassword')
  const params = Object.fromEntries(searchParams.entries())
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { Title } = Typography

  useEffect(() => {
    if (auth) {
      return navigate('/')
    }

    if (isInvite === 'true') {
      return navigate({
        pathname: '/auth/register',
        search: `?${createSearchParams(params)}`
      })
    }
    if (isChangePassword === 'true') {
      return navigate({
        pathname: '/auth/changePassword',
        search: `?${createSearchParams(params)}`
      })
    }
  }, [])

  return (
    <div className="min-h-screen grid place-content-center bg-gray-100 pt-12">
      <div className="flex flex-col items-center">
        <Title
          level={3}
          className="text-center"
        >
          <Logo className={'h-8'} />
        </Title>
        <Outlet />
      </div>
    </div>
  )
}
