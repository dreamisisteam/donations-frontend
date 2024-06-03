import { createContext } from 'react';

export const PageContext = createContext<TContext>({
	connectWallet: () => {},
	networkError: null,
	dismissNetwortError: () => {},
	selectedAccount: null,
	balance: null,
	tokenBalance: null,
	exchangerContract: null, 
	signer: null,
	tokenContract: null,
	contractAddress: null,
	exchangerContractAbi: null,
	donationTokenAbi: null,
});

type TContext = {
	connectWallet: () => void;
	networkError: string | null;
	dismissNetwortError: () => void
	selectedAccount: any,
	balance: string | null,
	tokenBalance: string | null,
	exchangerContract: any,
	signer: any,
	tokenContract: any,
	contractAddress: any,
	exchangerContractAbi:any,
	donationTokenAbi: any,
};
