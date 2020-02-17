import React from 'react'
import { motion } from 'framer-motion'

import styles from './Page.module.css'

const spring = {
  type: 'spring',
  damping: 10,
  stiffness: 100,
}

export default ({ children, className }) => (
  <motion.section
    layoutTransition={spring}
    key={window.location.pathname}
    className={`${className} ${styles.page}`}
    initial={{ opacity: 0, y: 50, transition: { delay: 1 } }}
    animate={{ opacity: 1, y: 0 }}
    exit={{
      y: -50,
      opacity: 0,
    }}
  >
    {children}
  </motion.section>
)
