import React, { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { TRefill, refillSchema } from "@/schemas";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '@/ui/Input/Input';
import Button from '@/ui/Button/Button';
import { PageContext } from '@/app/blockchainContext';
import { parseUnits } from 'ethers';

interface IModalRefill {
	closeModal: () => void
}

export default function ModalRefill({closeModal}: IModalRefill) {
	const { trigger, control, register, handleSubmit, formState: {errors} } = useForm<TRefill>({
		resolver: yupResolver(refillSchema),
		mode: "onBlur",
	});

	const { exchangerContract, signer, selectedAccount, contractAddress } = useContext(PageContext)

	const watchSum = useWatch({control, name: 'summa'})

	const onSubmit: SubmitHandler<TRefill> = (data) => console.log(data);

	const summaInGwei = useWatch({control, name: 'summa'})

	useEffect(() => {
		console.log('watchSum', watchSum)
		console.log('err', errors)
	}, [watchSum])

	const onModalChange = () => {
		let html = document?.querySelector('html');
		html?.classList?.remove('fixed')
		closeModal();
	}

	const sendRefill = async () => {
		await signer.sendTransaction({
			from: selectedAccount,
			to: contractAddress,
			value:  parseUnits(summaInGwei.toString(), "gwei"),
		})
		onModalChange()
	}

	return (
		<div>
			<form>
				<Input
					register={register}
					error={errors?.summa?.message}
					fieldName="summa"
					placeholder="Сколько DNTT вам необходимо?"
				/>
			</form>
			<div className='mt-3'>Сумма в <span className='color-primary'>ETH</span>: {!isNaN(summaInGwei) ? (summaInGwei * 0.000000001) : ''}</div>
			<Button
				text='Перевести'
				addClass='w-100 mt-4'
				disabled={isNaN(summaInGwei) || summaInGwei == 0}
				onClickF={() => sendRefill()}
			/>
		</div>
	);
}
