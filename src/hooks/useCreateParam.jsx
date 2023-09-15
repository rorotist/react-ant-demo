import {
  generatePath,
  useLocation,
  useMatch,
  useNavigate,
  useParams
} from 'react-router-dom'

export default function useCreateParam(tabData) {
  const location = useLocation()
  const isParams = !!useParams()?.id
  const match = useMatch(location.pathname)
  const navigate = useNavigate()

  const goParam = id => {
    const removeLastPath = match.pathname.substring(
      0,
      match.pathname.lastIndexOf('/')
    )
    const pathName = generatePath(`${removeLastPath}/:id/${tabData[0].key}`, {
      id
    })

    if (!isParams) {
      navigate(`${pathName}`, { replace: true })
    }
  }

  return goParam
}
