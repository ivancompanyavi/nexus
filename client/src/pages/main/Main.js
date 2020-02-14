import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import styles from './Main.module.css'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { when: 'afterChildren' } },
  left: { x: -100, transition: { from: 0 } },
  right: { x: 100, transition: { from: 0, duration: 1 } },
  stable: { x: 0 },
  exitLeft: { x: -100, opacity: 0, transition: { from: 0, duration: 5 } },
  exitRight: { x: 100, opacity: 0, transition: { from: 0, duration: 5 } },
}

export default () => (
  <motion.div
    key="main"
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className={styles.main}
  >
    <Link to="/gaming">
      <motion.h1
        key="main_left"
        variants={variants}
        initial="left"
        animate="stable"
        exit="exitLeft"
      >
        Ivan's
      </motion.h1>
      <div className={styles.gap}></div>
      <motion.h1
        key="main_right"
        variants={variants}
        initial="right"
        animate="stable"
        exit="exitRight"
      >
        page
      </motion.h1>
    </Link>
  </motion.div>
)
