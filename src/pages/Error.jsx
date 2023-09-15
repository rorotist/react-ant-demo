import { useNavigate, useRouteError } from 'react-router-dom'

import { Button, Typography } from 'antd'

import { IconAlertCircle } from '@tabler/icons-react'

import PropTypes from '@utils/PropTypes'

const { Text, Title } = Typography

export default function ErrorPage({ error }) {
  const routerError = useRouteError()
  const navigate = useNavigate()

  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto w-full">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <Text
            type="danger"
            className="p-3 text-sm rounded-full bg-red-50 leading-none"
          >
            <IconAlertCircle size={48} />
          </Text>
          <Title
            level={2}
            className="mt-3 md:text-3xl"
          >
            페이지를 찾을 수 없습니다.
          </Title>
          <Text className="mt-4 text-gray-500">
            {routerError?.error?.message || error?.message}
            <br />
            에러니까 돌아가요
          </Text>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button onClick={() => navigate(-1)}>뒤로 가기</Button>

            <Button
              type="primary"
              onClick={() => navigate('/')}
            >
              메인으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.object
}
