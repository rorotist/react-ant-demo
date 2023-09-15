import { Form } from 'antd'

import ContentPanel from '@components/ui/ContentPanel'
import CustomButton from '@components/ui/CustomButton'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronsUp, IconChevronsDown } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const FormGridSearch = ({
  defaultOpened = false,
  extended,
  children,
  onSubmit,
  onReset,
  isPanel = true,
  ...props
}) => {
  const [opened, { toggle }] = useDisclosure(defaultOpened)

  const body = (
    <Form
      onFinish={onSubmit}
      onReset={onReset}
      {...props}
      className={`relative ${!isPanel && 'mb-6'}`}
    >
      <div className={'group search-form-group relative'}>
        {children}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {extended}
            </motion.div>
          )}
        </AnimatePresence>
        {extended && (
          <CustomButton
            size={'small'}
            color={opened ? 'blue' : 'red'}
            onClick={toggle}
            style={{
              width: 30,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              padding: 0
            }}
            icon={opened ? <IconChevronsUp /> : <IconChevronsDown />}
            className={'absolute right-0 mt-[-1px]'}
          />
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <CustomButton
          htmlType="reset"
          variant="default"
          className={'w-[120px]'}
          label="초기화"
        />
        <CustomButton
          htmlType="submit"
          type="primary"
          className={'w-[120px]'}
          label="검색"
        />
      </div>
    </Form>
  )

  if (isPanel) {
    return <ContentPanel>{body}</ContentPanel>
  } else {
    return body
  }
}

FormGridSearch.propTypes = {
  defaultOpened: PropTypes.bool,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  extended: PropTypes.node,
  isPanel: PropTypes.bool
}

export default FormGridSearch
