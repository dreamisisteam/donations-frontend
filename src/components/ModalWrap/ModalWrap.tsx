import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import CloseCross from '@/icons/CloseCross';

interface IPaymentModal {
	isModalOpened: boolean;
	setIsModalOpened: (val: boolean) => void,
	children: ReactNode;
}

export default function ModalWrap({isModalOpened, setIsModalOpened, children}: IPaymentModal) {
	
	const onModalChange = () => {
		let html = document?.querySelector('html');
		console.log(html)
		if (isModalOpened) {
			html?.classList?.remove('fixed')
			setIsModalOpened(false)
		} else {
			html?.classList?.add('fixed')
			setIsModalOpened(true)
		}
	}
	
  return (
	isModalOpened && <div className={styles.modal} onClick={onModalChange}>
		<div className={styles['pop-up']} onClick={(event) => event.stopPropagation()}>
			<button onClick={onModalChange} className={styles.close}>
				<CloseCross />
			</button>
			{children}
		</div>
	</div>
  )
}
