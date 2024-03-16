/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  CondominiumAdapter,
  CondominiumAdapterInterface,
} from "../CondominiumAdapter";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "resident",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "residenceNumber",
        type: "uint16",
      },
    ],
    name: "addResident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "enum CondominiumLib.Category",
        name: "category",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "responsible",
        type: "address",
      },
    ],
    name: "addTopic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "closeVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "topicToEdit",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "responsible",
        type: "address",
      },
    ],
    name: "editTopic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getImplementationAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "openVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "resident",
        type: "address",
      },
    ],
    name: "removeResident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "removeTopic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "resident",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isEntering",
        type: "bool",
      },
    ],
    name: "setCounselor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "enum CondominiumLib.VoteOptions",
        name: "option",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5061002b676971d8a67ed7141560c01b61007e60201b60201c565b610045673b41ff5818fadfaa60c01b61007e60201b60201c565b3373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050610081565b50565b608051611f096100a36000396000818161025f01526109b30152611f096000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638fc5dad8116100715780638fc5dad81461016557806390ca27f31461018157806396fa1def1461019d5780639e1bf985146101b9578063b1583546146101d5578063eaf5d9dc146101f1576100b4565b80630900f010146100b95780630cbcae70146100d557806343b8c6b1146100f3578063597de9871461010f5780637b57ee491461012b5780638da5cb5b14610147575b600080fd5b6100d360048036038101906100ce9190611632565b61020d565b005b6100dd610356565b6040516100ea919061166e565b60405180910390f35b61010d6004803603810190610108919061182a565b6103ba565b005b61012960048036038101906101249190611632565b6105bf565b005b610145600480360381019061014091906118dd565b6107b8565b005b61014f6109b1565b60405161015c919061166e565b60405180910390f35b61017f600480360381019061017a91906118dd565b6109d5565b005b61019b6004803603810190610196919061194b565b610bce565b005b6101b760048036038101906101b291906119df565b610dca565b005b6101d360048036038101906101ce91906118dd565b610fc6565b005b6101ef60048036038101906101ea9190611a59565b6111bf565b005b61020b60048036038101906102069190611a99565b6113bb565b005b61022167a8a9b5038a57a7c860c01b6115bd565b61023567a42477f5677bc87d60c01b6115bd565b610249672cb7287924dd448e60c01b6115bd565b61025d67ce8d6844b35befda60c01b6115bd565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e290611b95565b60405180910390fd5b6102ff67b0fec0d890ff85d960c01b6115bd565b6103136795d9795b780672d260c01b6115bd565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600061036c67e0446e16c7564db160c01b6115bd565b61038067bac910181011706060c01b6115bd565b610394679d2ecec5bcf8435a60c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6103ce671a25557ec2dc65c660c01b6115bd565b6103e2674eb9dbacf4e8ad4660c01b6115bd565b6103f6672e062198d35f863260c01b6115bd565b61040a6742ab23bb58b997b560c01b6115bd565b61041e674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a490611c01565b60405180910390fd5b6104c167fcc6c63bf7f4742760c01b6115bd565b6104d5671666297bcded36c360c01b6115bd565b6104e967efa93efa376039d060c01b6115bd565b6104fd67201e7819b1c7988a60c01b6115bd565b61051167de9d63ed78ef632d60c01b6115bd565b61052567447ec90b07c4a11460c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166343b8c6b186868686866040518663ffffffff1660e01b8152600401610586959493929190611d15565b600060405180830381600087803b1580156105a057600080fd5b505af11580156105b4573d6000803e3d6000fd5b505050505050505050565b6105d367300658bf9b6dae1c60c01b6115bd565b6105e7674eb9dbacf4e8ad4660c01b6115bd565b6105fb672e062198d35f863260c01b6115bd565b61060f6742ab23bb58b997b560c01b6115bd565b610623674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036106b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a990611c01565b60405180910390fd5b6106c667fcc6c63bf7f4742760c01b6115bd565b6106da671666297bcded36c360c01b6115bd565b6106ee673512e9dfa532d26360c01b6115bd565b610702670edbc4208dd3fa9c60c01b6115bd565b61071667a24077af2034fd0160c01b6115bd565b61072a67beb2f3a6e60e0ef360c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663597de987826040518263ffffffff1660e01b8152600401610783919061166e565b600060405180830381600087803b15801561079d57600080fd5b505af11580156107b1573d6000803e3d6000fd5b5050505050565b6107cc676ad252c0c2c91cea60c01b6115bd565b6107e0674eb9dbacf4e8ad4660c01b6115bd565b6107f4672e062198d35f863260c01b6115bd565b6108086742ab23bb58b997b560c01b6115bd565b61081c674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036108ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a290611c01565b60405180910390fd5b6108bf67fcc6c63bf7f4742760c01b6115bd565b6108d3671666297bcded36c360c01b6115bd565b6108e767493acea03c4fcc6a60c01b6115bd565b6108fb67776872ece40b40e660c01b6115bd565b61090f6768906dcc9eb1cb4760c01b6115bd565b61092367692ead4ce849082760c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637b57ee49826040518263ffffffff1660e01b815260040161097c9190611d76565b600060405180830381600087803b15801561099657600080fd5b505af11580156109aa573d6000803e3d6000fd5b5050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6109e967c216664e9c8e024060c01b6115bd565b6109fd674eb9dbacf4e8ad4660c01b6115bd565b610a11672e062198d35f863260c01b6115bd565b610a256742ab23bb58b997b560c01b6115bd565b610a39674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610ac8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abf90611c01565b60405180910390fd5b610adc67fcc6c63bf7f4742760c01b6115bd565b610af0671666297bcded36c360c01b6115bd565b610b04677739f565b5fa875160c01b6115bd565b610b1867c593fc853ac7a14960c01b6115bd565b610b2c67173c42e871cf6b0f60c01b6115bd565b610b4067ecf1d3dbe418182a60c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638fc5dad8826040518263ffffffff1660e01b8152600401610b999190611d76565b600060405180830381600087803b158015610bb357600080fd5b505af1158015610bc7573d6000803e3d6000fd5b5050505050565b610be2677d63173fb71a6c0160c01b6115bd565b610bf6674eb9dbacf4e8ad4660c01b6115bd565b610c0a672e062198d35f863260c01b6115bd565b610c1e6742ab23bb58b997b560c01b6115bd565b610c32674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610cc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb890611c01565b60405180910390fd5b610cd567fcc6c63bf7f4742760c01b6115bd565b610ce9671666297bcded36c360c01b6115bd565b610cfd675af1d97100380dd560c01b6115bd565b610d1167455fb6c7376230bf60c01b6115bd565b610d25678ac09d0255a2be9a60c01b6115bd565b610d396740564a0af032420c60c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166390ca27f383836040518363ffffffff1660e01b8152600401610d94929190611de0565b600060405180830381600087803b158015610dae57600080fd5b505af1158015610dc2573d6000803e3d6000fd5b505050505050565b610dde6793c53e9b5b24346b60c01b6115bd565b610df2674eb9dbacf4e8ad4660c01b6115bd565b610e06672e062198d35f863260c01b6115bd565b610e1a6742ab23bb58b997b560c01b6115bd565b610e2e674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610ebd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb490611c01565b60405180910390fd5b610ed167fcc6c63bf7f4742760c01b6115bd565b610ee5671666297bcded36c360c01b6115bd565b610ef96744abf88d15baeb6960c01b6115bd565b610f0d67bd67d855d7286aa860c01b6115bd565b610f2167618549980961154c60c01b6115bd565b610f3567a457c49ba7a7366060c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166396fa1def83836040518363ffffffff1660e01b8152600401610f90929190611e1f565b600060405180830381600087803b158015610faa57600080fd5b505af1158015610fbe573d6000803e3d6000fd5b505050505050565b610fda67865921fc198218fd60c01b6115bd565b610fee674eb9dbacf4e8ad4660c01b6115bd565b611002672e062198d35f863260c01b6115bd565b6110166742ab23bb58b997b560c01b6115bd565b61102a674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036110b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b090611c01565b60405180910390fd5b6110cd67fcc6c63bf7f4742760c01b6115bd565b6110e1671666297bcded36c360c01b6115bd565b6110f5671d762de904c378a460c01b6115bd565b61110967ea2e8ff52c99f27660c01b6115bd565b61111d67bf334a01cb7ae22d60c01b6115bd565b61113167548f4361e01691fc60c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639e1bf985826040518263ffffffff1660e01b815260040161118a9190611d76565b600060405180830381600087803b1580156111a457600080fd5b505af11580156111b8573d6000803e3d6000fd5b5050505050565b6111d3673dd587b53324e2ab60c01b6115bd565b6111e7674eb9dbacf4e8ad4660c01b6115bd565b6111fb672e062198d35f863260c01b6115bd565b61120f6742ab23bb58b997b560c01b6115bd565b611223674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036112b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112a990611c01565b60405180910390fd5b6112c667fcc6c63bf7f4742760c01b6115bd565b6112da671666297bcded36c360c01b6115bd565b6112ee670c14faa83045c0f860c01b6115bd565b61130267a2e2178df1a6cb2760c01b6115bd565b611316675839deb0bd4c72b560c01b6115bd565b61132a67b724bce34897f4bf60c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b158354683836040518363ffffffff1660e01b8152600401611385929190611e57565b600060405180830381600087803b15801561139f57600080fd5b505af11580156113b3573d6000803e3d6000fd5b505050505050565b6113cf674e32ea4dc12be70660c01b6115bd565b6113e3674eb9dbacf4e8ad4660c01b6115bd565b6113f7672e062198d35f863260c01b6115bd565b61140b6742ab23bb58b997b560c01b6115bd565b61141f674e8541f42a24fc1f60c01b6115bd565b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036114ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114a590611c01565b60405180910390fd5b6114c267fcc6c63bf7f4742760c01b6115bd565b6114d6671666297bcded36c360c01b6115bd565b6114ea677c4e4df1f1f3d0b460c01b6115bd565b6114fe671d0b6fcfaf125d8960c01b6115bd565b611512672beb6703103f3f6c60c01b6115bd565b61152667aaaae401805a1a9360c01b6115bd565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eaf5d9dc858585856040518563ffffffff1660e01b81526004016115859493929190611e80565b600060405180830381600087803b15801561159f57600080fd5b505af11580156115b3573d6000803e3d6000fd5b5050505050505050565b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006115ff826115d4565b9050919050565b61160f816115f4565b811461161a57600080fd5b50565b60008135905061162c81611606565b92915050565b600060208284031215611648576116476115ca565b5b60006116568482850161161d565b91505092915050565b611668816115f4565b82525050565b6000602082019050611683600083018461165f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6116dc82611693565b810181811067ffffffffffffffff821117156116fb576116fa6116a4565b5b80604052505050565b600061170e6115c0565b905061171a82826116d3565b919050565b600067ffffffffffffffff82111561173a576117396116a4565b5b61174382611693565b9050602081019050919050565b82818337600083830152505050565b600061177261176d8461171f565b611704565b90508281526020810184848401111561178e5761178d61168e565b5b611799848285611750565b509392505050565b600082601f8301126117b6576117b5611689565b5b81356117c684826020860161175f565b91505092915050565b600481106117dc57600080fd5b50565b6000813590506117ee816117cf565b92915050565b6000819050919050565b611807816117f4565b811461181257600080fd5b50565b600081359050611824816117fe565b92915050565b600080600080600060a08688031215611846576118456115ca565b5b600086013567ffffffffffffffff811115611864576118636115cf565b5b611870888289016117a1565b955050602086013567ffffffffffffffff811115611891576118906115cf565b5b61189d888289016117a1565b94505060406118ae888289016117df565b93505060606118bf88828901611815565b92505060806118d08882890161161d565b9150509295509295909350565b6000602082840312156118f3576118f26115ca565b5b600082013567ffffffffffffffff811115611911576119106115cf565b5b61191d848285016117a1565b91505092915050565b6004811061193357600080fd5b50565b60008135905061194581611926565b92915050565b60008060408385031215611962576119616115ca565b5b600083013567ffffffffffffffff8111156119805761197f6115cf565b5b61198c858286016117a1565b925050602061199d85828601611936565b9150509250929050565b60008115159050919050565b6119bc816119a7565b81146119c757600080fd5b50565b6000813590506119d9816119b3565b92915050565b600080604083850312156119f6576119f56115ca565b5b6000611a048582860161161d565b9250506020611a15858286016119ca565b9150509250929050565b600061ffff82169050919050565b611a3681611a1f565b8114611a4157600080fd5b50565b600081359050611a5381611a2d565b92915050565b60008060408385031215611a7057611a6f6115ca565b5b6000611a7e8582860161161d565b9250506020611a8f85828601611a44565b9150509250929050565b60008060008060808587031215611ab357611ab26115ca565b5b600085013567ffffffffffffffff811115611ad157611ad06115cf565b5b611add878288016117a1565b945050602085013567ffffffffffffffff811115611afe57611afd6115cf565b5b611b0a878288016117a1565b9350506040611b1b87828801611815565b9250506060611b2c8782880161161d565b91505092959194509250565b600082825260208201905092915050565b7f596f7520646f206e6f742068617665207065726d697373696f6e000000000000600082015250565b6000611b7f601a83611b38565b9150611b8a82611b49565b602082019050919050565b60006020820190508181036000830152611bae81611b72565b9050919050565b7f596f75206d757374207570677261646520666972737400000000000000000000600082015250565b6000611beb601683611b38565b9150611bf682611bb5565b602082019050919050565b60006020820190508181036000830152611c1a81611bde565b9050919050565b600081519050919050565b60005b83811015611c4a578082015181840152602081019050611c2f565b60008484015250505050565b6000611c6182611c21565b611c6b8185611b38565b9350611c7b818560208601611c2c565b611c8481611693565b840191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60048110611ccf57611cce611c8f565b5b50565b6000819050611ce082611cbe565b919050565b6000611cf082611cd2565b9050919050565b611d0081611ce5565b82525050565b611d0f816117f4565b82525050565b600060a0820190508181036000830152611d2f8188611c56565b90508181036020830152611d438187611c56565b9050611d526040830186611cf7565b611d5f6060830185611d06565b611d6c608083018461165f565b9695505050505050565b60006020820190508181036000830152611d908184611c56565b905092915050565b60048110611da957611da8611c8f565b5b50565b6000819050611dba82611d98565b919050565b6000611dca82611dac565b9050919050565b611dda81611dbf565b82525050565b60006040820190508181036000830152611dfa8185611c56565b9050611e096020830184611dd1565b9392505050565b611e19816119a7565b82525050565b6000604082019050611e34600083018561165f565b611e416020830184611e10565b9392505050565b611e5181611a1f565b82525050565b6000604082019050611e6c600083018561165f565b611e796020830184611e48565b9392505050565b60006080820190508181036000830152611e9a8187611c56565b90508181036020830152611eae8186611c56565b9050611ebd6040830185611d06565b611eca606083018461165f565b9594505050505056fea2646970667358221220c6613b8ae6fe8d26aac31829e6d7804235bc4219cf9e9310bc9d4858312bbc6364736f6c63430008180033";

type CondominiumAdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CondominiumAdapterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CondominiumAdapter__factory extends ContractFactory {
  constructor(...args: CondominiumAdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CondominiumAdapter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CondominiumAdapter__factory {
    return super.connect(runner) as CondominiumAdapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CondominiumAdapterInterface {
    return new Interface(_abi) as CondominiumAdapterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): CondominiumAdapter {
    return new Contract(address, _abi, runner) as unknown as CondominiumAdapter;
  }
}
