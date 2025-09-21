import { NavLink } from 'react-router'
import styles from './UserProfile.module.scss'
import { ROUTES } from '../../routes/routesPaths'

export const UserProfile = () => {
    return (
        <div className={styles.userprofile}>
            <h1>User Profile</h1>
            <NavLink to={ROUTES.DASHDOARD}>
                DASHDOARD
            </NavLink>
        </div>
    )
}