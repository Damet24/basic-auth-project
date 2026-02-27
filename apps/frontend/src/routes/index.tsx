import { createBrowserRouter } from 'react-router'
import { IndexPage } from '../pages/IndexPage'

export const router = createBrowserRouter([
  {
    index: true,
    element: <IndexPage />,
  },
])
