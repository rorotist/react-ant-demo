import { useSearchParams } from 'react-router-dom'

import { Form, Input, Space, Typography } from 'antd'

import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'

export default function Register() {
  const [searchParams] = useSearchParams()
  const { Title, Paragraph } = Typography

  const [form] = Form.useForm()
  const setRegister = data => {
    console.log(data)
    console.log('mutate')
  }
  const email = searchParams.get('email')

  return (
    <>
      <Space
        direction="vertical"
        align="center"
        size={'large'}
        className="w-[400px]"
      >
        <ContentPanel className={'w-[400px] shadow'}>
          <Title level={4}>회원가입</Title>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              inviteEmail: email,
              loginId: '',
              password: '',
              confirmPassword: '',
              name: '',
              phoneNumber: ''
            }}
            onFinish={setRegister}
            validateTrigger="onSubmit"
          >
            <Form.Item
              name="inviteEmail"
              label="초대받은 이메일"
              rules={[
                {
                  required: true,
                  message: '초대받은 이메일 없습니다 문의해주세요'
                }
              ]}
            >
              <Input
                placeholder="초대받은 이메일"
                disabled
              />
            </Form.Item>
            <Form.Item
              name="loginId"
              label="아이디"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 16
                },
                {
                  pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-z])[a-z0-9]+$/),
                  message: '영문소문자+숫자 조합으로 입력해주세요.'
                }
              ]}
            >
              <Input placeholder="영문소문자+숫자로 최대 6~16자로 설정해 주세요." />
            </Form.Item>
            <Form.Item
              name="password"
              label="비밀번호"
              rules={[
                { required: true, min: 10, max: 20 },
                {
                  pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/),
                  message: '영문대소문자 + 숫자 조합의 10~20자로 설정해 주세요.'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('loginId') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        '아이디와 동일한 비밀번호는 사용 할 수 없습니다.'
                      )
                    )
                  }
                })
              ]}
            >
              <Input placeholder="비밀번호는 영문대소문자 + 숫자 조합의 10~20자로 설정해 주세요." />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="비밀번호 확인"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('비밀번호와 같아야 합니다.')
                    )
                  }
                })
              ]}
            >
              <Input placeholder="비밀번호 확인" />
            </Form.Item>
            <Form.Item
              name="name"
              label="이름"
              rules={[{ required: true }]}
            >
              <Input placeholder="이름" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="핸드폰번호"
              rules={[
                { required: true },
                {
                  pattern: new RegExp(/(^01\d{1})(\d{3,4})(\d{4})$/),
                  message: '핸드폰번호 형식으로 입력해주세요'
                }
              ]}
            >
              <Input placeholder="-없이 입력해주세요" />
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
                가입하기
              </CustomButton>
            </Form.Item>
          </Form>
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
    </>
  )
}
