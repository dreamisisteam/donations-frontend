'use client'
import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import Button from '@/ui/Button/Button';
import ModalWrap from '@/components/ModalWrap/ModalWrap';
import Modal from '@/components/Modals/Modal';
import { PageContext } from '@/app/blockchainContext';

export default function SupportTeam() {
	const [openedSupportAll, setOpenedSupportAll] = useState<boolean>(false)
	const [openedSupportRandom, setOpenedSupportRandom] = useState<boolean>(false)

	const openModal = (setModalFunction: (val: boolean) => void) => {
		let html = document?.querySelector('html');
		html?.classList?.add('fixed')
		setModalFunction(true)
	}

	const {selectedAccount} = useContext(PageContext)

	return <section className={styles.support} id='support-us'>
		<h2 className="h2">Поддержать участников</h2>
		<div className={styles.info}>
			<p className={styles.text}>
				У каждого участника есть свои цели, желания, планы или мечты. Рядом
				с фото приведены его имя, хобби, описание, цели и статус их 
				выполненеия. Если Вы хотитите поддержать конкретного человека или 
				случайного участника, просто нажмите на одну из кнопок, введите сумму 
				доната и отправьте необходимое количество DNTT.
			</p>
			<div className={[styles.buttons, 'w-100 d-flex justify-content-center'].join(' ')}>
				<Button addClass='me-4 w-25' disabled={!selectedAccount} text='Поддержать всех' onClickF={() => openModal(setOpenedSupportAll)} />
				<Button addClass='w-25' disabled={!selectedAccount} text='Поддержать случайного участника' onClickF={() => openModal(setOpenedSupportRandom)} />
			</div>
		</div>
		<ModalWrap isModalOpened={openedSupportAll} setIsModalOpened={setOpenedSupportAll}>
			<h3 className='modal-title'>Поддержать всех</h3>
			<Modal type='all' closeModal={() => setOpenedSupportAll(false)}/>
		</ModalWrap>
		<ModalWrap isModalOpened={openedSupportRandom} setIsModalOpened={setOpenedSupportRandom}>
			<h3 className='modal-title'>Поддержать случайного участника</h3>
			<Modal type='random' closeModal={() => setOpenedSupportRandom(false)}/>
		</ModalWrap>
	</section>;
}
