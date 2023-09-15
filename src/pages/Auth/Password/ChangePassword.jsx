import { Link, useSearchParams } from 'react-router-dom'

import { Form, Input, Space, Typography } from 'antd'

import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'

export default function ChangePassword() {
  const [searchParams] = useSearchParams()
  const { Title, Paragraph } = Typography
  const [form] = Form.useForm()
  const loginId = searchParams.get('loginId')

  return (
    <Space
      direction="vertical"
      align="center"
      size={'large'}
      className="w-[400px]"
    >
      <ContentPanel className={'w-[400px] shadow'}>
        <Title level={4}>비밀번호 설정</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            changeId: loginId,
            password: '',
            cconfirmPassword: ''
          }}
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="changeId"
            label="아이디"
            rules={[
              {
                required: true,
                message: '변경 할 아이디가 없습니다. 문의해주세요'
              }
            ]}
          >
            <Input
              placeholder="아이디"
              disabled
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="새로운 비밀번호"
            rules={[
              { required: true, min: 10, max: 20 },
              {
                pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/),
                message: '영문대소문자 + 숫자 조합으로 설정해 주세요.'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('loginId') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('아이디와 동일한 비밀번호는 사용 할 수 없습니다.')
                  )
                }
              })
            ]}
          >
            <Input placeholder="새로운 비밀번호" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="새로운 비밀번호 확인"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('비밀번호와 같아야 합니다.'))
                }
              })
            ]}
          >
            <Input placeholder="새로운 비밀번호 확인" />
          </Form.Item>
          <Form.Item
            position="right"
            mt="md"
          >
            <CustomButton
              block
              color="b"
              htmlType="submit"
            >
              비밀번호 변경
            </CustomButton>
          </Form.Item>
        </Form>
        <div className="flex items-center justify-end ">
          <Link to={'/auth/login'}>로그인 페이지로 이동</Link>
        </div>
      </ContentPanel>
      <Paragraph type="secondary">
        <ul>
          <li> 아이디는 영문소문자+숫자로 최대 6~16자로 설정해 주세요.</li>
          <li>
            비밀번호는 영문대소문자 + 숫자 조합의 10~20자로 설정해 주세요.
          </li>
          <li>
            아이디와 동일 문자가 포함된 경우 비밀번호 설정이 불가하며,
            특수문자는 !@#$%^&+=-_.() 만 사용 가능합니다.
          </li>
        </ul>
      </Paragraph>
    </Space>
  )
}
