import { routesGuide } from '@/routes/menu/guide'

const routesData = [
  ...[import.meta.env.MODE === 'dev' ? routesGuide : {}]
]

export default routesData
