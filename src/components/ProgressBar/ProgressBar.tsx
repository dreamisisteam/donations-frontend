import React from 'react'
import styles from './styles.module.css'

interface IProgressBar {
	total: number,
	charges: number
}

export default function ProgressBar({total, charges}: IProgressBar) {
  return (
	<div className={styles['progress-bar']}>
		<div className={styles['progress']} style={{width: charges / total <= 1 ? `${charges / total * 100}%` : '100%'}}></div>
	</div>
  )
}
