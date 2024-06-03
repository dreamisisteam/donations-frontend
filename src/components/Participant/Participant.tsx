import Badge from '@/ui/Badge/Badge';
import Button from '@/ui/Button/Button';
import React, { useContext, useState } from "react";
import styles from './styles.module.css'
import ProgressBar from '../ProgressBar/ProgressBar';
import ModalWrap from '../ModalWrap/ModalWrap';
import Modal from '../Modals/Modal';
import { PageContext } from '@/app/blockchainContext';

interface INeeds {
	name: string,
	total: number
}

interface IParticipantInfo  {
	avatar_url: string,
	needs: INeeds[],
	id: number,
	address: string,
	charges: number,
	total: number,
	description: string,
	tags: string[],
	user: {
		first_name: string,
		last_name: string
	}
}

interface IPrticipant {
	variant: 'default' | 'alternative', 
	info: IParticipantInfo;
}

export default function Participant({variant, info}: IPrticipant) {

	const {selectedAccount} = useContext(PageContext)

	const [openedSupport, setOpenedSupport] = useState<boolean>(false)

	return (
		<>
		<div className={styles.participant}>
			{variant == 'default' && <img className={styles.photo} src={'http://backend-blockchain.com:8001' + info.avatar_url} />}
			<div className={[styles['participant-info-block'], variant == 'alternative' ? 'align-items-end' : ''].join(' ')}>
				<div className={[styles['name'], variant == 'alternative' ? 'text-end' : ''].join(' ')}>{info.user.first_name} {info.user.last_name}</div>
				<div className={styles.badges}>
					{info?.tags?.map((tag, index) => (
						<Badge text={tag} key={tag + index} />
					))}
				</div>
				<p className={[styles["participant-info"], variant == 'alternative' ? 'text-end' : ''].join(' ')}>
					{info.description}
				</p>
				<div className={styles.needs}>Собирает на: {info?.needs?.map((item) => item.name + '(' + item.total + ')').join(', ')}.</div>
				<div className='caption mb-1'>Собрано: {info?.charges} из {info?.total}</div>
				<ProgressBar total={info?.total} charges={info?.charges} />
				<Button 
					addClass='mt-4' 
					text='Поддержать' 
					onClickF={() => setOpenedSupport(true)}
					disabled={!selectedAccount}
				/>
			</div>
			{variant == 'alternative' && <img className={styles['photo-reverse']} src={'http://backend-blockchain.com:8001' + info.avatar_url} />}
			<ModalWrap isModalOpened={openedSupport} setIsModalOpened={setOpenedSupport}>
				<h3 className='modal-title'>Поддержать: {info.user.first_name + ' ' + info.user.last_name}</h3>
				<Modal type='certain' participantAddress={info?.address} closeModal={() => setOpenedSupport(false)} />
			</ModalWrap>
		</div>
	</>
	);
}
