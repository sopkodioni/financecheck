import { MainPage } from '../pages/MainPage/MainPage.jsx';
import { Dashboard } from '../pages/Dashboard/Dashboard.jsx';
import { AppSettings } from '../pages/AppSettings/AppSettings.jsx';
import { UserProfile } from '../pages/UserProfile/UserProfile.jsx';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from './routesPaths.js';
import { Analytics } from '../pages/Dashboard/components/Main/Pages/Analytics.jsx';
import { Wallets } from '../pages/Dashboard/components/Main/Pages/Wallets.jsx';
import { Transactions } from '../pages/Dashboard/components/Main/Pages/Transactions.jsx';
import { PrivateRoute } from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    Component: MainPage
  },
  {
    path: ROUTES.DASHDOARD,
    Component: () => (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: Analytics },
      { path: 'incomes', Component: Transactions },
      { path: 'wallets', Component: Wallets },
    ]
  },
  {
    path: ROUTES.SETTINGS,
    Component: () => (
      <PrivateRoute>
        <AppSettings />
      </PrivateRoute>
    )
  },
  {
    path: ROUTES.PROFILE,
    Component: () => (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    )
  }
]);