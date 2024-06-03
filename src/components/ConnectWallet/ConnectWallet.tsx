import React from "react";
import "./styles.css";
import NetworkError from "@/components/NetworkError/NetworkError";
import Button from '@/ui/Button/Button';

interface IConnectWallet {
	connectWallet: () => void;
	networkError: string | null;
	dissmiss: any;
}

export default function ConnectWallet({
	connectWallet,
	networkError,
	dissmiss,
}: IConnectWallet) {
	return (
		<div>
			{networkError && (<NetworkError message={networkError} dismiss={dissmiss} />)}
			<Button
				text='Подключить кошелек'
				onClickF={connectWallet}
			/>
		</div>
	);
}
