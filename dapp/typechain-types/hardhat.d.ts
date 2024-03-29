/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Condominium",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Condominium__factory>;
    getContractFactory(
      name: "CondominiumAdapter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CondominiumAdapter__factory>;
    getContractFactory(
      name: "ICondominium",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICondominium__factory>;

    getContractAt(
      name: "Condominium",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Condominium>;
    getContractAt(
      name: "CondominiumAdapter",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CondominiumAdapter>;
    getContractAt(
      name: "ICondominium",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ICondominium>;

    deployContract(
      name: "Condominium",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Condominium>;
    deployContract(
      name: "CondominiumAdapter",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CondominiumAdapter>;
    deployContract(
      name: "ICondominium",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ICondominium>;

    deployContract(
      name: "Condominium",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Condominium>;
    deployContract(
      name: "CondominiumAdapter",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CondominiumAdapter>;
    deployContract(
      name: "ICondominium",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ICondominium>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
