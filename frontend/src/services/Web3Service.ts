import { ethers } from 'ethers';
import ABI from './ABI.json';

const ADAPTER_ADDRESS = `${process.env.REACT_APP_ADAPTER_ADDRESS}`

export enum Profile {
  RESIDENT = 0,
  COUNSELOR = 1,
  MANAGER = 2
}

export type LoginResult = {
  account: string;
  profile: Profile
}

function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) throw new Error('No MetaMask found!');
  return new ethers.BrowserProvider(window.ethereum);
}

function getContract(provider?: ethers.BrowserProvider): ethers.Contract {
  if (!provider) provider = getProvider();
  return new ethers.Contract(ADAPTER_ADDRESS, ABI, provider);
}

export async function doLogin(): Promise<LoginResult> {
  const provider = getProvider();
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!accounts?.length) throw new Error('Wallet not allowed!');

  const contract = getContract(provider);
  const manager = (await contract.getManager()) as string;
  const isManager = manager.toUpperCase() === accounts[0].toUpperCase();

  if (isManager) {
    localStorage.setItem('profile', String(Profile.MANAGER));  
  } else {
    localStorage.setItem('profile', String(Profile.RESIDENT))
  }

  localStorage.setItem('account', accounts[0].toUpperCase());
  
  return {
    account: accounts[0],
    profile: Number(localStorage.getItem('profile') ?? Profile.RESIDENT)
  }
}

export function doLogout() {
  localStorage.removeItem('account');
  localStorage.removeItem('profile');
}