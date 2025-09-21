import { MainPage } from '../pages/MainPage/MainPage.jsx'
import { Dashboard } from '../pages/Dashboard/Dashboard.jsx'
import { AppSettings } from '../pages/AppSettings/AppSettings.jsx'
import { UserProfile } from '../pages/UserProfile/UserProfile.jsx'
import { createBrowserRouter } from 'react-router'
import { ROUTES } from './routesPaths.js'

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    Component: MainPage
  },
  {
    path: ROUTES.DASHDOARD,
    Component: Dashboard
  },
  {
    path: ROUTES.SETTINGS,
    Component: AppSettings
  },
  {
    path: ROUTES.PROFILE,
    Component: UserProfile
  }
])