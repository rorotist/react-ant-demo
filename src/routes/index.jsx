import { createBrowserRouter } from 'react-router-dom'

import Login from '@pages/Auth/Login'
import ChangePassword from '@pages/Auth/Password/ChangePassword'
import FindPassword from '@pages/Auth/Password/FindPassword'
import Register from '@pages/Auth/Register'

import AuthIndex from '@pages/Auth'
import ErrorPage from '@pages/Error'
import Protected from '@pages/Protected'

import App from '@/App'
import routesData from '@/routes/menu'

const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <App />
      </Protected>
    ),
    errorElement: <ErrorPage />,
    handle: {
      title: 'Home'
    },
    children: routesData
  },
  {
    path: 'auth',
    element: <AuthIndex />,
    children: [
      {
        index: true,
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'findPassword',
        element: <FindPassword />
      },
      {
        path: 'ChangePassword',
        element: <ChangePassword />
      }
    ]
  }
])

export default Routes
