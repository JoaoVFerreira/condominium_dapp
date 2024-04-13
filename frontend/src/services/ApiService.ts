import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`

type DoApiLoginParams = {
  wallet: string;
  secret: string;
  timestamp: number;
}


export async function doApiLogin({ wallet, secret, timestamp }:DoApiLoginParams): Promise<string> {
  const response = await axios.post(`${API_URL}/login`, {
    wallet,
    secret, 
    timestamp
  })
  return response?.data?.token
}