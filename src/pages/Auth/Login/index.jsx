import { Link, useLocation, useNavigate } from 'react-router-dom'
import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'
import { Form, Input, Typography } from 'antd'
import useAuth from '@hooks/useAuth'

export default function Login() {
  const { Text } = Typography
  const navigate = useNavigate()
  const location = useLocation()
  const { onLogin, isLoginLoading } = useAuth()

  const initialValues = {
    loginId: 'admin',
    password: 'Cmipartners!'
  }
  const setLogin = async value => {
    console.log(value)

    await onLogin(value)

    const origin = location.state?.from?.pathname || '/'
    navigate(origin, { replace: true })
  }

  return (
    <div className="w-[400px] text-left">
      <Text className="mb-5 block text-center text-gray-400">
        © CMI Partners All Rights Reserved.
      </Text>

      <ContentPanel className="shadow">
        <Form
          layout="vertical"
          initialValues={initialValues}
          onFinish={setLogin}
          requiredMark={false}
        >
          <Form.Item
            name="loginId"
            label="아이디"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="you@email.com"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
          >
            <Input.Password placeholder="******" />
          </Form.Item>

          <div className="flex flex-column mt-4 mb-4 justify-end">
            {/* <Checkbox label="로그인 상태 기억하기">
              로그인 상태 기억하기
            </Checkbox> */}
            <Link to="/auth/findPassword">비밀번호 찾기</Link>
          </div>

          <Form.Item>
            <CustomButton
              block
              color="b"
              loading={isLoginLoading}
              htmlType="submit"
            >
              로그인
            </CustomButton>
          </Form.Item>
        </Form>
      </ContentPanel>
    </div>
  )
}
