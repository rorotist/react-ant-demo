import { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'

import { Row, Col, Input, Modal, Form } from 'antd'

import CustomButton from '@components/ui/CustomButton'

import PropTypes from '@utils/PropTypes'

export default function PostCode({
  names = ['zoneCode', 'address', 'addressDetail'],
  values,
  onChange
}) {
  const form = Form.useFormInstance()
  const watchZoneCode = Form.useWatch(names[0], { form, preserve: true })
  const watchAddress = Form.useWatch(names[1], { form, preserve: true })
  const watchAddressDetail = Form.useWatch(names[2], { form, preserve: true })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState({
    zipcode: form?.getFieldValue(names[0], true),
    address: form?.getFieldValue(names[1], true),
    detailAddress: form?.getFieldValue(names[2], true)
  })

  const handleChange = val => {
    onChange?.({
      [names[0]]: val.zipcode,
      [names[1]]: val.address,
      [names[2]]: val.detailAddress
    })

    form?.setFieldValue(names[0], val.zipcode)
    form?.setFieldValue(names[1], val.address)
    form?.setFieldValue(names[2], val.detailAddress)
  }

  const handleSearchComplete = data => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    const value = {
      zipcode: data.zonecode,
      address: fullAddress,
      detailAddress: currentValue.detailAddress
    }
    handleChange(value)
    setCurrentValue(value)
    setIsModalOpen(false)
  }

  const handleDetailAddress = e => {
    const value = {
      zipcode: currentValue.zipcode,
      address: currentValue.address,
      detailAddress: e.target.value
    }
    handleChange(value)
    setCurrentValue(value)
  }

  useEffect(() => {
    if (
      values &&
      (values[names[0]] !== currentValue.zipcode ||
        values[names[1]] !== currentValue.address ||
        values[names[2]] !== currentValue.detailAddress)
    ) {
      setCurrentValue({
        zipcode: values[names[0]],
        address: values[names[1]],
        detailAddress: values[names[2]]
      })
    }
  }, [values])

  useEffect(() => {
    if (!values) {
      setCurrentValue({
        zipcode: form?.getFieldValue(names[0], true),
        address: form?.getFieldValue(names[1], true),
        detailAddress: form?.getFieldValue(names[2], true)
      })
    }
  }, [watchZoneCode, watchAddress, watchAddressDetail])

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col flex={'100px'}>
          <Input
            value={currentValue.zipcode}
            disabled
          />
        </Col>
        <Col flex={'100px'}>
          <CustomButton
            label={'우편번호 찾기'}
            onClick={() => setIsModalOpen(true)}
          />
        </Col>
        <Col span={24}>
          <Input
            value={currentValue.address}
            disabled
          />
        </Col>
        <Col span={24}>
          <Input
            value={currentValue.detailAddress}
            onChange={handleDetailAddress}
          />
        </Col>
      </Row>
      <Modal
        title={'우편번호검색'}
        open={isModalOpen}
        footer={false}
        bodyStyle={{ borderRadius: 4, overflow: 'hidden' }}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
      >
        <DaumPostcode
          onComplete={handleSearchComplete}
          useBannerLink={false}
          submitMode={false}
          autoClose={false}
          style={{ height: 444 }}
        />
      </Modal>
    </>
  )
}

PostCode.propTypes = {
  names: PropTypes.array,
  values: PropTypes.object,
  onChange: PropTypes.func
}
