import React, { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { TDonate, donateSchema } from "@/schemas";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '@/ui/Input/Input';
import Button from '@/ui/Button/Button';
import { PageContext } from '@/app/blockchainContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IModal {
	type: 'all' | 'random' | 'certain',
	participantAddress?: string,
	closeModal: () => void
}

export default function Modal({type, participantAddress, closeModal}: IModal) {
	const { trigger, control, register, handleSubmit, formState: {errors} } = useForm<TDonate>({
		resolver: yupResolver(donateSchema),
		mode: "onBlur",
	});

	const {tokenContract, selectedAccount} = useContext(PageContext);

	const watchSum = useWatch({control, name: 'summa'})

	useEffect(() => {
		console.log('watchSum', watchSum)
		console.log('err', errors)
	}, [watchSum])

	const queryClient = useQueryClient()

	const onModalChange = () => {
		let html = document?.querySelector('html');
		html?.classList?.remove('fixed')
		closeModal();
	}
	
	const support = async () => {
		console.log(await tokenContract.balanceOf(selectedAccount))
		if (type == 'all') {
			const tx = await tokenContract?.donateAll(Number(watchSum));
			await tx.wait();
		} else if (type == 'random') {
			const tx = await tokenContract.donate(Number(watchSum));
			await tx.wait();
		} else {
			console.log('конкретный чел')
			await tokenContract.transfer(participantAddress, watchSum)
		}
		queryClient.invalidateQueries({ queryKey: ['members'] });
		onModalChange()
	}

	return (
		<div>
			<form>
				<Input
					register={register}
					error={errors?.summa?.message}
					fieldName="summa"
					placeholder="Сумма доната в DNTT"
				/>
			</form>
			<Button
				text='Перевести'
				addClass='w-100 mt-4'
				disabled={isNaN(watchSum) || watchSum <= 0}
				onClickF={support}
			/>
		</div>
	);
}
