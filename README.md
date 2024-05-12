# DAO Condominium Fortress
This project is a Decentralized Autonomous Organization (DAO) aimed at reducing dependency on third-party intermediaries to save costs and minimize the risk of scams. By leveraging blockchain technology, the platform provides transparency and establishes reliable trust among residents.

## Objectives

- **Cost Reduction:** By eliminating the need for intermediaries, the DAO reduces operational costs associated with traditional management systems.

- **Enhanced Security:** Utilizing blockchain technology enhances security measures, reducing the likelihood of fraudulent activities within the condominium community.

- **Community Empowerment:** Through decentralized decision-making processes, residents have greater control over condominium affairs, fostering a sense of community empowerment.

## Features
- **Membership Management:** Residents can register and manage their membership within the condominium community.

- **Voting Mechanism:** The platform enables residents to propose and vote on important decisions concerning the condominium's governance and management.

- **Financial Management:** Transparent financial management tools allow residents to track expenditures, budgets, and contributions securely.

- **Document Repository:** Important documents such as meeting minutes and regulations are stored securely and accessible to authorized community members.

## Tech Stack
### Blockchain
- Solidity
- Hardhat
- Ethers
- Chai & Mocha

### Frontend
- React
- Typescript
- Ethers

### Backend
- Node.js
- Express
- Postgres
- Sequelize

## Demo

**Manager POV**
<img src="frontend/public/POV_manager.gif">

**Resident POV**
<img src="frontend/public/POV_resident.gif">

## How to use

backend **.env** suggestion

``` bash
DB_USERNAME=postgres
DB_PASSWORD=admin123
DB_NAME=condominium
DB_HOST=localhost
DB_PORT=5432
TIMEZONE=America/Sao_Paulo
DIALECT=postgres
DATABASE_URL=postgres://postgres:admin123@localhost:5432/condominium?sslmode=disable
PORT=8000
JWT_SECRET="any"
JWT_EXPIRES=36000
CORS_ORIGIN="*"
``` 
frontend **.env** suggestion

``` bash
REACT_APP_ADAPTER_ADDRESS=0x57f16AfA888ADBF90714C96b0c506Bd64BA8525c
REACT_APP_API_URL=http://localhost:8000
``` 

blockchain **.env** suggestion

``` bash
SECRET=yourSecret
API_KEY=yourApiKey
BSC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
CHAIN_ID=97
``` 

- Clone the repo
``` bash
git clone https://github.com/JoaoVFerreira/condominium_dapp.git
```

- Requires an account on a wallet client like Metamask or others...
- Adding BNB through a faucet. [BNB Faucet](https://www.bnbchain.org/en/testnet-faucet)
- Need to create an account and switch to BSC test net, as it's the testnet blockchain where the smart contract is deployed.
- Create a 'file' folder in the root of the backend project to store topic files.
- Use suggested **env.**
- Create a local PostgreSQL database using the script in the backend.
- Run npm install and npm run start for the frontend.
- Run npm install and npm run dev for the backend.

## License
This project is available under the **MIT License**