import PropTypes from '@utils/PropTypes'

export default function SectionHeader({ children }) {
  return (
    <div className="flex flex-col gap-2 bg-slate-100 p-4 rounded">
      {children}
    </div>
  )
}

SectionHeader.propTypes = {
  children: PropTypes.node
}
