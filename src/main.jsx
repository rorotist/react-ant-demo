import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { App, ConfigProvider, message } from 'antd'

import { AuthProvider } from '@services/AuthContext'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'

import mergeLocaleValues from '@utils/antLocale.js'

import Routes from './routes/index.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: error => error.response?.status >= 500
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      const errorMessage =
        error.response?.data?.resultMsg || query.meta.errorMessage
      message.warning(errorMessage)
    }
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return
      const errorMessage = error.response?.data?.resultMsg
      message.warning(errorMessage)
    }
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <ConfigProvider
          locale={mergeLocaleValues}
          theme={{
            token: {
              fontFamily: 'Pretendard',
              colorPrimary: '#00aeef',
            },
            components: {}
          }}
        >
          <App notification={{ placement: 'topRight' }}>
            <RouterProvider router={Routes} />
          </App>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
