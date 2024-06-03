'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Image from "next/image";
import styles from "./styles.module.css";
import Logo from '@/icons/Logo';
import Menu from '@/icons/Menu';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import { PageContext } from '@/app/blockchainContext';
import { formatEther, formatUnits } from 'ethers';
import WalletIcon from '@/icons/WalletIcon';
import Button from '@/ui/Button/Button';
import ModalWrap from '../ModalWrap/ModalWrap';
import ModalRefill from '../Modals/ModalRefill';

export default function Header() {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const onResize = () => {
		let innerWidth = window.innerWidth
		if (innerWidth > 992) {
			setIsOpened(false)
			let html = document.querySelector('html')
			html?.classList?.contains('fixed') ? html?.classList?.remove('fixed') : null;
		}
	}

	// useEffect(() => {
	// 	window.addEventListener('resize', onResize)
	// }, [])

	const { connectWallet, networkError, dismissNetwortError, selectedAccount, balance, tokenBalance } = useContext(PageContext)

	const onMenuClick = () => {
		let html = document.querySelector('html')
		html?.style?.setProperty('--vh', `${window?.innerHeight / 100}px`);
		if (isOpened) {
			setIsOpened(false);
			html?.classList?.contains('fixed') ? html?.classList?.remove('fixed') : null;
		} else {
			setIsOpened(true);
			!html?.classList?.contains('fixed') ? html?.classList?.add('fixed') : null;
		}
	}

	return (
		<>
			<nav className={[styles.header, 'container'].join(' ')}>
				<div className={styles.logo}>
					<Logo />
					DONUT
				</div>
				<div className={styles.links}>
					<a href='#about' className={styles.link}>О нас</a>
					<a href='#team' className={styles.link}>Участники</a>
					<a href='#support-us' className={styles.link}>Поддержать участников</a>
				</div>
				<div className={[styles['mob-menu'], `container${isOpened ? ` ${styles['opened']}` : ''}`].join(' ')}>
					<a href='#about' onClick={onMenuClick} className={styles['link-mob']}>О нас</a>
					<a href='#team' onClick={onMenuClick} className={styles['link-mob']}>Участники</a>
					<a href='#support-us' onClick={onMenuClick} className={styles['link-mob']}>Поддержать участников</a>
				</div>
				<div className={styles.wallet}>
					<button className={styles.menu} onClick={onMenuClick}><Menu /></button>
					{!selectedAccount && (
						<ConnectWallet
							connectWallet={connectWallet}
							networkError={networkError}
							dissmiss={dismissNetwortError}
						/>
					)}
					{selectedAccount && <Button text='Пополнить DNTT' addClass='ms-4' onClickF={() => setIsModalOpened(true)} />}
					{balance && <p className={[styles['wallet-icon'], 'mb-0 ms-4 color-primary'].join(' ')}><WalletIcon /> {Number(formatEther(balance)).toFixed(4)} ETH</p>}
					{tokenBalance && <p className={[styles['wallet-icon-yellow'], 'mb-0 ms-2 color-yellow'].join(' ')}><WalletIcon /> {Number(tokenBalance).toFixed(0)} DNTT</p>}
				</div>
			</nav>
			<ModalWrap isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
				<h3 className='modal-title'>Пополнить DNTT</h3>
				<ModalRefill closeModal={() => setIsModalOpened(false)} />
			</ModalWrap>
		</>
	)
}
