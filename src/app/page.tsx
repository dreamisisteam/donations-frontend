"use client";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header/Header";
import AboutUs from "@/components/AboutUs/AboutUs";
import Team from "@/components/Team/Team";
import SupportTeam from "@/components/SupportTeam/SupportTeam";
import { ContractRunner, Eip1193Provider, ethers, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

import { PageContext } from "./blockchainContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getNetworkSchema } from '@/service';

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

const HARDHAT_NETWORK_ID = "5777";

export default function Home() {
	const [selectedAccount, setSelectedAccount] = useState<any>(null);
	const [txBeingSent, setTxBeingSent] = useState<any>(null);
	const [networkError, setNetworkError] = useState<any>(null);
	const [transactionError, setTransactionError] = useState<any>(null);
	const [balance, setBalance] = useState<any>(null);
	const [tokenBalance, setTokenBalance] = useState<any>(null);
	const [provider, setProvider] = useState<any>(null);
	const [signer, setSigner] = useState<any>(null);
	const [exchangerContract, setExchangerContract] = useState<any>(null);
	const [tokenContract, setTokenContract] = useState<any>(null);

	const [contractAddress, setContractAddress] = useState<any>(null);
	const [exchangerContractAbi, setExchangerContractAbi] = useState<any>(null);
	const [donationTokenAbi, setDonationTokenAbi] = useState<any>(null);

	//@ts-ignore
	window?.ethereum?.on("accountsChanged", ([newAddress]) => {
		console.log("accountsChanged");
		if (newAddress === undefined) {
			return resetState();
		}

		initialize(newAddress);
	});

	//@ts-ignore
	window.ethereum.on("chainChanged", ([networkId]) => {
		console.log("chainChanged");
		return resetState();
	});

	const connectWallet = async () => {
		console.log("connectWallet");
		if (window?.ethereum === undefined) {
			setNetworkError("Please install Metamask");
			return;
		}
		const [selectedAddress]: any = await window.ethereum.request({
			method: "eth_requestAccounts",
		});

		if (!checkNetwork()) return;
	};

	const initialize = async (selectedAddress: any) => {
		let providerData = new ethers.BrowserProvider(
			window.ethereum as Eip1193Provider
		);
		setProvider(providerData);

		const signerInstance = await providerData.getSigner(0) as unknown as ContractRunner;
		setSigner(signerInstance);

		const contractsData = await getNetworkSchemaData();

		const exchangerData = new ethers.Contract(
			contractsData.contract_address,  // contract_address
			contractsData.exchanger_contract_abi, // exchanger_contract_abi
			signerInstance,
		);
		setExchangerContract(exchangerData);

		const tokenContractAddress = await exchangerData.token()
		const tokenData = new ethers.Contract(
			tokenContractAddress,
			contractsData.token_contract_abi, // token_contract_abi
			signerInstance,
		);
		setTokenContract(tokenData);
		setSelectedAccount(selectedAddress);
	};

	useEffect(() => {
		updateBalance();
	}, [selectedAccount]);

	const checkAddress = async () => {
		const [selectedAddress]: any = await window?.ethereum?.request({
			method: "eth_accounts",
		});
		if (selectedAddress) {
			initialize(selectedAddress);
		}
		return selectedAddress;
	};

	const getNetworkSchemaData = async () => {
		const res = await getNetworkSchema();
		setContractAddress(res?.data?.contract_address)
		setExchangerContractAbi(res?.data?.exchanger_contract_abi)
		setDonationTokenAbi(res?.data?.token_contract_abi)
		return res?.data
	}

	useEffect(() => {
		checkAddress();
	}, []);


	const updateBalance = async () => {
		if (selectedAccount) {
			const newBalance = (
				await provider?.getBalance(selectedAccount)
			)?.toString();
			setBalance(newBalance);
			setTokenBalance(await tokenContract.balanceOf(selectedAccount));
		}
	};

	const resetState = () => {
		setSelectedAccount(null);
		setTxBeingSent(null);
		setNetworkError(null);
		setTransactionError(null);
		setBalance(null);
		setTokenBalance(null);
	};

	const checkNetwork = () => {
		if (window.ethereum?.networkVersion === HARDHAT_NETWORK_ID) return true;
			setNetworkError("Please connect to localhost:8545");
		return false;
	};

	const dismissNetwortError = () => {
		setNetworkError(null);
	};

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<PageContext.Provider
				value={{
					connectWallet,
					networkError,
					dismissNetwortError,
					selectedAccount,
					balance,
					tokenBalance,
					exchangerContract,
					signer,
					tokenContract,
					contractAddress,
					exchangerContractAbi,
					donationTokenAbi,
				}}
			>
				<main className={[styles.main, "container"].join(" ")}>
					<Header />
					<AboutUs />
					<Team />
					<SupportTeam />
				</main>
			</PageContext.Provider>
		</QueryClientProvider>
	);
}
