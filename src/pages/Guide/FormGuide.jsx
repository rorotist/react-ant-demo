import { useState } from 'react'

import { Alert, Form } from 'antd'

import ModalPartnerSupplier from '@components/modal/ModalPartnerSupplier'
import CustomButton from '@components/ui/CustomButton'
import FormGrid from '@components/ui/FormGrid'
import PostCode from '@components/ui/PostCode'

import transFormPercentage from '@utils/transFormPercentage'

export function FormGuide() {
  const [form] = Form.useForm()
  const [postTest, setPostTest] = useState({
    postCode: '10535',
    address: '경기 고양시 덕양구 소원로 272 (행신동, (주)디자이너스랩 DL빌딩)',
    addressDetail: null
  })

  const onSave = values => {
    console.log(form.getFieldsValue(true), values)
  }

  const onDelete = () => {
    console.log('삭제')
  }
  const goList = () => {
    console.log('목록')
  }

  const [supplierSelected, setSupplierSelected] = useState({
    name: '네이버_copy_copy',
    key: 10
  })
  const [supplierCheckSelected, setSupplierCheckSelected] = useState({
    name: ['네이버_copy_copy'],
    key: [10]
  })

  return (
    <>
      <PostCode
        values={postTest}
        onChange={setPostTest}
        names={['postCode', 'address', 'addressDetail']}
      />
      <br />
      <br />
      <FormGrid
        form={form}
        name="control-hooks"
        initialValues={{
          name1: 123,
          date: null,
          startDate: null,
          endDate: null,
          customTest: 3,
          postCode: null,
          address: null,
          addressDetail: null,
          price: 10000,
          name2: {
            price: 10000,
            test: 20,
            test2: null
          }
        }}
        onSubmit={onSave}
        onDelete={onDelete}
        goList={goList}
        actionsText={{ list: '목록2' }}
        suffix={
          <>
            <CustomButton>suffix</CustomButton>
          </>
        }
        infix={<>infix</>}
        prefix={<>prefix</>}
      >
        <FormGrid.Section title={'기본정보'}>
          <FormGrid.Column label="test1">
            <Alert
              message="Success Text dsdsfsdfsfsdddddd"
              type="success"
              style={{ width: '100%' }}
            />
            <FormGrid.Item
              name={'date'}
              rules={[{ required: true }]}
              component={'DatePicker'}
              showTime
            />
            <FormGrid.Item
              shouldUpdate={(prev, cur) => prev.endDate !== cur.endDate}
            >
              {() => (
                <FormGrid.Item
                  name={'startDate'}
                  rules={[{ required: true }]}
                  component={'DatePicker'}
                  rangeKeys={['startDate', 'endDate']}
                  isRange
                />
              )}
            </FormGrid.Item>
            몇날 몇일
            <FormGrid.Item
              name={'name'}
              rules={[{ required: true }]}
              component={'Input'}
            />
          </FormGrid.Column>
          <FormGrid.Column label={'test1'}>
            <FormGrid.Item
              name={'name1'}
              rules={[{ required: true }]}
              component={'Input'}
            />
          </FormGrid.Column>

          <FormGrid.Column
            label={'퍼센트 계산 예'}
            required
          >
            <Alert
              message="Success Text dsdsfsdfsfsdddddd"
              type="success"
              style={{ width: '100%' }}
            />
            <FormGrid.Item
              component={'Input'}
              name={['name2', 'price']}
              rules={[{ required: true }]}
              onChange={e => {
                form.setFieldValue(
                  ['name2', 'test2'],
                  transFormPercentage({
                    value: e.target.value,
                    percentage: form.getFieldValue(['name2', 'test'])
                  })
                )
              }}
            />
            <FormGrid.Item
              component={'Input'}
              name={['name2', 'test']}
              rules={[{ required: true }]}
              onChange={e => {
                form.setFieldValue(
                  ['name2', 'test2'],
                  transFormPercentage({
                    percentage: e.target.value,
                    value: form.getFieldValue(['name2', 'price'])
                  })
                )
              }}
            />
            <FormGrid.Item
              component={'Input'}
              name={['name2', 'test2']}
              rules={[{ required: true }]}
            />
          </FormGrid.Column>

          <FormGrid.Group>
            <FormGrid.Column label={'test3'}>
              <FormGrid.Item
                component={'Input'}
                name={'name3'}
                rules={[{ required: false }]}
              />
            </FormGrid.Column>
            <FormGrid.Column label={'test4'}>
              <FormGrid.Item
                component={'Input'}
                name={'name4'}
                rules={[{ required: false }]}
                style={{ width: 100 }}
              />
            </FormGrid.Column>
          </FormGrid.Group>
        </FormGrid.Section>

        <FormGrid.Section title={'기본정보'}>
          <FormGrid.Column label={'test4'}>
            <FormGrid.Item
              component={'Input'}
              name={'name4'}
              rules={[{ required: true }]}
            />
          </FormGrid.Column>
          <FormGrid.Group>
            <FormGrid.Column label={'test5'}>
              <FormGrid.Item
                component={'Input'}
                name={'name6'}
                rules={[{ required: true }]}
              />
            </FormGrid.Column>
            <FormGrid.Column label={'test6'}>
              <FormGrid.Item
                component={'Input'}
                name={'name6'}
                rules={[{ required: false }]}
              />
            </FormGrid.Column>
          </FormGrid.Group>

          <FormGrid.Column label={'주소'}>
            <FormGrid.Item
              name={'address'}
              rules={[{ required: true }]}
            >
              <PostCode names={['postCode', 'address', 'addressDetail']} />
            </FormGrid.Item>
          </FormGrid.Column>

          <FormGrid.Column label={'공급사 단일 선택'}>
            <ModalPartnerSupplier
              selectType="radio"
              selected={supplierSelected}
              buttonProps={{ size: 'small' }}
              onOk={({ key, name }) => {
                setSupplierSelected({
                  key,
                  name
                })
              }}
            />
            <ModalPartnerSupplier.Selected
              selectType="radio"
              selected={supplierSelected}
            />
          </FormGrid.Column>

          <FormGrid.Column label={'공급사 멀티 선택'}>
            <ModalPartnerSupplier
              selectType="checkbox"
              selected={supplierCheckSelected}
              buttonProps={{
                color: 'p',
                size: 'small'
              }}
              onOk={({ key, name }) => {
                setSupplierCheckSelected({
                  key,
                  name
                })
              }}
            />
            <ModalPartnerSupplier.Selected
              selectType="checkbox"
              selected={supplierCheckSelected}
              onDelete={({ key, name }) => {
                setSupplierCheckSelected({
                  key,
                  name
                })
              }}
            />
          </FormGrid.Column>
        </FormGrid.Section>
      </FormGrid>
    </>
  )
}
