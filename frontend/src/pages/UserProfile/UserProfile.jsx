import { NavLink } from 'react-router'
import styles from './UserProfile.module.scss'

export const UserProfile = () => {
    return (
        <div className={styles.userprofile}>
            <h1>User Profile</h1>
            <NavLink to='/dashboard'>
                LK
            </NavLink>
        </div>
    )
}