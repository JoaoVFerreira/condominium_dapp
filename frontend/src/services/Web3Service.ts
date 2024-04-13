import { ethers } from 'ethers';
import { doApiLogin } from './ApiService';
import ABI from './ABI.json';

const ADAPTER_ADDRESS = `${process.env.REACT_APP_ADAPTER_ADDRESS}`

export enum Profile {
  RESIDENT = 0,
  COUNSELOR = 1,
  MANAGER = 2
}

export type LoginResult = {
  account: string;
  profile: Profile;
  token: string;
}

export type Resident = {
  wallet: string;
  isCounselor: boolean;
  isManager: boolean;
  nextPayment: number;
  residence: number;
}

export type ResidentPage = {
  residents: Resident[];
  total: ethers.BigNumberish;
}

function getProfile(): Profile {
  const profile = localStorage.getItem('profile') ?? '0';
  return Number(profile);
}

function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) throw new Error('No MetaMask found!');
  return new ethers.BrowserProvider(window.ethereum);
}

function getContract(provider?: ethers.BrowserProvider): ethers.Contract {
  if (!provider) provider = getProvider();
  return new ethers.Contract(ADAPTER_ADDRESS, ABI, provider);
}

async function getContractSigner(provider?: ethers.BrowserProvider): Promise<ethers.BaseContract> {
  if (!provider) provider = getProvider();
  const signer = await provider.getSigner(localStorage.getItem("account") ?? undefined);
  const contract =  new ethers.Contract(ADAPTER_ADDRESS, ABI, provider);
  return contract.connect(signer);
}

export async function doLogin(): Promise<LoginResult> {
  const provider = getProvider();
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!accounts?.length) throw new Error('Wallet not allowed!');

  const contract = getContract(provider);
  const resident = (await contract.getResident(accounts[0])) as Resident;
  let isManager = resident.isManager;

  if (!isManager && resident.residence > 0) {
    if (resident.isCounselor) {
      localStorage.setItem('profile', String(Profile.COUNSELOR));
    } else {
      localStorage.setItem('profile', String(Profile.RESIDENT));
    }
  } else if (!isManager && !resident.residence) {
    const manager = await contract.getManager() as string; 
    isManager = accounts[0].toUpperCase() === manager.toUpperCase()
  }

  if (isManager) {
    localStorage.setItem('profile', String(Profile.MANAGER));  
  } else if (localStorage.getItem('profile') === null) {
    throw new Error('You are not allowed to enter the system')
  }

  localStorage.setItem('account', accounts[0]);

  const signer = await provider.getSigner();
  const timestamp = Date.now();
  const message = `Authenticating to Condominium. Timestamp: ${timestamp}`;
  const secret = await signer.signMessage(message);
  const token = await doApiLogin({ wallet: accounts[0], secret, timestamp });
  localStorage.setItem('token', token);

  return {
    account: accounts[0],
    token,
    profile: Number(localStorage.getItem('profile') ?? Profile.RESIDENT)
  }
}

export function doLogout() {
  localStorage.removeItem('account');
  localStorage.removeItem('profile');
}

export async function getAddress(): Promise<string> {
  const contract = getContract();
  return contract.getAddress();
}

export async function upgrade(address: string): Promise<ethers.Transaction> {
  if (getProfile() !== Profile.MANAGER) {
    throw new Error('You do not have permission');
  }
  const contract = await getContractSigner() as any;
  return contract.upgrade(address) as ethers.Transaction;
}

export async function addResident(wallet: string, residence: number): Promise<ethers.Transaction> {
  if (getProfile() === Profile.RESIDENT) {
    throw new Error('You do not have permission');
  }
  const contract = await getContractSigner() as any;
  return contract.addResident(wallet, residence) as ethers.Transaction;
}

export function isManager(): boolean {
  return parseInt(localStorage.getItem('profile') ?? '0') === Profile.MANAGER;
}

export function isResident(): boolean {
  return parseInt(localStorage.getItem('profile') ?? '0') === Profile.RESIDENT;
}

export async function getResidents(page: number = 1, pageSize: number = 10): Promise<ResidentPage> {
  const contract = getContract();
  const result = await contract.getResidents(page, pageSize) as ResidentPage;
  const residents = [...result.residents.filter(r => r.residence)].sort((a, b) => ethers.toNumber(a.residence - b.residence));
  
  return {
    residents,
    total: result.total
  }
}

export async function getResident(wallet: string): Promise<Resident> {
  const contract = getContract();
  return contract.getResident(wallet);
}

export async function removeResident(wallet: string): Promise<ethers.Transaction> {
  if (getProfile() !== Profile.MANAGER) {
    throw new Error('You do not have permission');
  }
  const contract = await getContractSigner() as any;
  return contract.removeResident(wallet) as ethers.Transaction;
}

export async function setCounselor(wallet: string, isEntering: boolean): Promise<ethers.Transaction> {
  if (getProfile() === Profile.MANAGER) {
    throw new Error('You do not have permission');
  }
  const contract = await getContractSigner() as any;
  return contract.setCounselor(wallet, isEntering) as ethers.Transaction;
}