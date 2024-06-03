import React from 'react';
import styles from './styles.module.css'

interface IBadge {
	text: string;
}

export default function Badge({text}: IBadge) {
  return (
	<div className={styles.badge}>{text}</div>
  )
}
