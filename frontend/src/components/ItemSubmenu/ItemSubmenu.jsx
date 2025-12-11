import { NavLink } from "react-router"
import { Icon } from "../Icon"

export const ItemSubmenu = ({items}) => {
    if(items){
        return (
            <ul>
                { items.map((item) => (
                    <li>
                        <NavLink to={item.path}>
                            <Icon key={item.id} name={item.iconTitle}/>
                        </NavLink>
                    </li>
                )) }
            </ul>
        )
    }
}

// className={styles.submenuList}