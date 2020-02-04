import React from 'react'

import styles from './Loader.module.css'

export default () => (
  <svg className={styles.loader} width={50} height={5}>
    <rect id="loader" width={50} height={5} fill="white" />
    <rect id="backgroundLeft" x={-50} width={50} height={5} fill="#84775e" />
    <rect id="backgroundRight" x={50} width={50} height={5} fill="#84775e" />
    <animate
      xlinkHref="#backgroundLeft"
      id="loader1"
      attributeName="x"
      begin="0s;loader4.end"
      from="-50"
      to="0"
      dur="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.5 0 0.5 1;"
    />
    <animate
      xlinkHref="#backgroundLeft"
      id="loader2"
      attributeName="x"
      begin="loader1.end"
      from="0"
      to="-50"
      dur="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0 0.5 0.5 1;"
    />
    <animate
      xlinkHref="#backgroundRight"
      id="loader3"
      attributeName="x"
      begin="loader2.end"
      from="50"
      to="0"
      dur="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.5 0 0.5 1;"
    />
    <animate
      xlinkHref="#backgroundRight"
      id="loader4"
      attributeName="x"
      begin="loader3.end"
      from="0"
      to="50"
      dur="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.5 0 0.5 1;"
    />
  </svg>
)
