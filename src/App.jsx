import '@styles/globals.css'
import { Outlet } from 'react-router-dom'

import Layout from '@components/layout/Layout'
import LayoutProvider from '@components/layout/context/LayoutContext'
import 'dayjs/locale/ko'

function App() {
  return (
    <LayoutProvider>
      <Layout>
        <Outlet />
      </Layout>
    </LayoutProvider>
  )
}

export default App
