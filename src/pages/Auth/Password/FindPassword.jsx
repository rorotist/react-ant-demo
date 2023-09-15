import { Link } from 'react-router-dom'
import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'
import { Form, Input, Space, Typography } from 'antd'

export default function FindPassword() {
  const { Title, Paragraph } = Typography
  const [form] = Form.useForm()

  return (
    <Space
      direction="vertical"
      align="center"
      size={'large'}
      className="w-[400px]"
    >
      <ContentPanel className={'w-[400px] shadow'}>
        <Title level={4}>비밀번호 찾기</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            loginId: '',
            email: ''
          }}
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="loginId"
            label="아이디"
            rules={[{ required: true }]}
          >
            <Input placeholder="아이디" />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[{ required: true }]}
          >
            <Input placeholder="이메일" />
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
              비밀번호 재설정 메일 발송
            </CustomButton>
          </Form.Item>
        </Form>
        <div className="flex items-center justify-end ">
          <Link to={'/auth/login'}>로그인 페이지로 이동</Link>
        </div>
      </ContentPanel>
      <Paragraph type="secondary">
        <ul>
          <li>운영자 이메일로 비밀번호 변경 링크를 전송합니다.</li>
          <li>운영자 아이디와 이메일을 정확히 입력해주세요.</li>
          <li>
            {`아이디 또는 이메일 주소를 분실한 경우 슬랙 ${'>'} 오류신고 채널로 접수해
            주세요.`}
          </li>
        </ul>
      </Paragraph>
    </Space>
  )
}
