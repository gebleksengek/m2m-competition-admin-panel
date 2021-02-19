import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout'
  },
  {
    path: '/home',
    exact: true,
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/gallery/list',
    exact: true,
    component: lazy(() => import('../../views/gallery/List'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
