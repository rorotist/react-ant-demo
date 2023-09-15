import { useOutletContext, useParams } from 'react-router-dom'

export function Child1() {
  const parentData = useOutletContext()
  const params = useParams()
  return (
    <>
      <p>parent Context: {parentData.value}</p>
      <p>params: {params?.id}</p>
    </>
  )
}
