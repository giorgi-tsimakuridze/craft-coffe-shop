import { Link, Outlet } from "react-router-dom";
import styles from "../styles/Admin.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>☕ Admin Panel</h2>
        <ul className={styles.menu}>
          <li>
            <Link to="/ingredients">ინგრედიენტები</Link>
          </li>
          <li>
            <Link to="/coffees">ყავები</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
