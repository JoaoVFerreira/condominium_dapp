/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface CondominiumInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addResident"
      | "counselors"
      | "isResident"
      | "manager"
      | "removeResident"
      | "residenceExists"
      | "residences"
      | "residents"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addResident",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "counselors",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isResident",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeResident",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "residenceExists",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "residences",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "residents",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addResident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "counselors", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isResident", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeResident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "residenceExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "residences", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "residents", data: BytesLike): Result;
}

export interface Condominium extends BaseContract {
  connect(runner?: ContractRunner | null): Condominium;
  waitForDeployment(): Promise<this>;

  interface: CondominiumInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addResident: TypedContractMethod<
    [resident: AddressLike, residenceNumber: BigNumberish],
    [void],
    "nonpayable"
  >;

  counselors: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  isResident: TypedContractMethod<[resident: AddressLike], [boolean], "view">;

  manager: TypedContractMethod<[], [string], "view">;

  removeResident: TypedContractMethod<
    [resident: AddressLike],
    [void],
    "nonpayable"
  >;

  residenceExists: TypedContractMethod<
    [residence: BigNumberish],
    [boolean],
    "view"
  >;

  residences: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;

  residents: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addResident"
  ): TypedContractMethod<
    [resident: AddressLike, residenceNumber: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "counselors"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isResident"
  ): TypedContractMethod<[resident: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "manager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeResident"
  ): TypedContractMethod<[resident: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "residenceExists"
  ): TypedContractMethod<[residence: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residences"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residents"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  filters: {};
}
