import {NavLink} from 'react-router'
import styles from './MenuItem.module.scss'
import {Icon} from '../../../../components/Icon'
import {ItemSubmenu} from '../../../../components/ItemSubmenu/ItemSubmenu'

export const MenuItem = ({iconTitle, path, colorClassMod, submenuList = null}) => {
    return (
        <NavLink 
            to={path}
            className={`
                ${styles.menuItem} 
                ${styles[colorClassMod]}
            `}
        >
            <Icon name={iconTitle} />
            {
                submenuList ? 
                <ItemSubmenu items={submenuList || null} />
                : 
                null
            }
        </NavLink>
    )
}