import { twMerge } from 'tailwind-merge'

import PropTypes from '@utils/PropTypes'

export default function ContentPanel({ children, className }) {
  const classMerge = twMerge(
    'border border-solid border-slate-200 rounded p-5 first-of-type:mt-0 mt-5 bg-white',
    className
  )
  return <div className={classMerge}>{children}</div>
}

ContentPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
