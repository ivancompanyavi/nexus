import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './Menu.module.css'

export default () => {
  const location = useLocation()
  if (location.pathname === '/') return null
  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/gaming">Gaming</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
