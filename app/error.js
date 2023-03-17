"use client"

import React from "react"
import styles from "@/styles/Error.module.scss"
export default function Error({ error, reset }) {
  return (
    <div className={styles.container}>
      <div>
        <h1>Error</h1>
        <div>{error.message}</div>
      </div>
    </div>
  )
}
