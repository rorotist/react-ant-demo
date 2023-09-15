import PropTypes from 'prop-types'

const FormGridGroup = ({ children }) => {
  return (
    <div className={'flex flex-wrap max-md:flex-col group form-grid-group'}>
      {children}
    </div>
  )
}

FormGridGroup.propTypes = {
  children: PropTypes.node,
  gridTemplateColumns: PropTypes.string
}

export default FormGridGroup
