import React from 'react'

import styles from './Content.module.css'

export default ({ children }) => (
  <section className={styles.content}>{children}</section>
)
