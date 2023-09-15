import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWindowScroll } from '@mantine/hooks'
import { Button, Checkbox, Form, Input } from 'antd'
import * as z from 'zod'

export default function LayoutBody() {
  const [form] = Form.useForm()

  const schema = z
    .object({
      username: z.string().nonempty(),
      password: z.string().min(1),
      remember: z.boolean({
        required_error: 'remember is required'
      })
    })
    .required({
      username: true
    })
    .refine(data => data.remember, {
      path: ['remember']
    })

  const { control, handleSubmit } = useForm({
    defaultValues: { username: undefined, password: '', remember: false },
    resolver: zodResolver(schema)
  })

  const [scroll] = useWindowScroll()
  const [, setScrollToTop] = useState()
  // const { message } = App.useApp()
  // const openNotification = () => {
  //   console.log(message)
  //   message.success('Success!')
  // }

  useEffect(() => {
    if (scroll.y > 100) {
      setScrollToTop(true)
    } else {
      setScrollToTop(false)
    }
  }, [scroll])
  const values = Form.useWatch([], form)
  console.log(values)
  return (
    <div className="flex flex-col box-border w-[100%] max-w-[50%]">
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(data => {
          console.log(data)
        })}
      >
        <FormItem
          control={control}
          name="username"
          label="Username"
        >
          <Input />
        </FormItem>
        <FormItem
          control={control}
          name="password"
          label="Password"
        >
          <Input.Password />
        </FormItem>
        <FormItem
          control={control}
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </FormItem>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
