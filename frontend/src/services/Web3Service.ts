import { ethers } from 'ethers';

function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) throw new Error('No MetaMask found!');
  return new ethers.BrowserProvider(window.ethereum);
}

export async function doLogin(): Promise<string> {
  const provider = getProvider();
  const accounts = await provider.send('eth_requestAccounts', []);
  if (!accounts?.length) throw new Error('Wallet not allowed!');
  localStorage.setItem('account', accounts[0]);
  
  return accounts[0];
}