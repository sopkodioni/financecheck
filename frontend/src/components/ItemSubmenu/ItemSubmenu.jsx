import { NavLink } from "react-router";
import { Icon } from "../Icon";
import styles from "./MenuItemSubmenu.module.scss";

export const ItemSubmenu = ({ items }) => {
    if (!items) return null;

    return (
        <ul className={styles.itemSubmenu}>
            {items.map(item => (
                <li key={item.id}>
                    <NavLink to={item.path}>
                        <Icon name={item.iconTitle} />
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};