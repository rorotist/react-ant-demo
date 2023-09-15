import { Typography } from 'antd'

import ContentPanel from '@components/ui/ContentPanel'
import PropTypes from 'prop-types'

const FormGridSection = ({ children, title }) => {
  return (
    <ContentPanel>
      {title && (
        <Typography.Title
          level={5}
          style={{
            marginBottom: 12
          }}
        >
          {title}
        </Typography.Title>
      )}
      {children}
    </ContentPanel>
  )
}

FormGridSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default FormGridSection
