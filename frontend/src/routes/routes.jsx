import { MainPage } from '../pages/MainPage/MainPage.jsx'
import { Dashboard } from '../pages/Dashboard/Dashboard.jsx'
import { AppSettings } from '../pages/AppSettings/AppSettings.jsx'
import { UserProfile } from '../pages/UserProfile/UserProfile.jsx'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainPage
  },
  {
    path: '/dashboard',
    Component: Dashboard
  },
  {
    path: '/app-settings',
    Component: AppSettings
  },
  {
    path: '/profile',
    Component: UserProfile
  }
])