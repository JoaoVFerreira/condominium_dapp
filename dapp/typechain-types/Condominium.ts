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

export declare namespace CondominiumLib {
  export type TopicStruct = {
    title: string;
    description: string;
    status: BigNumberish;
    createdDate: BigNumberish;
    startDate: BigNumberish;
    endDate: BigNumberish;
    category: BigNumberish;
    amount: BigNumberish;
    responsible: AddressLike;
  };

  export type TopicStructOutput = [
    title: string,
    description: string,
    status: bigint,
    createdDate: bigint,
    startDate: bigint,
    endDate: bigint,
    category: bigint,
    amount: bigint,
    responsible: string
  ] & {
    title: string;
    description: string;
    status: bigint;
    createdDate: bigint;
    startDate: bigint;
    endDate: bigint;
    category: bigint;
    amount: bigint;
    responsible: string;
  };
}

export interface CondominiumInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addResident"
      | "addTopic"
      | "closeVoting"
      | "counselors"
      | "editTopic"
      | "getTopic"
      | "isResident"
      | "manager"
      | "monthlyQuota"
      | "numberOfVotes"
      | "openVoting"
      | "removeResident"
      | "removeTopic"
      | "residenceExists"
      | "residences"
      | "residents"
      | "setCounselor"
      | "topicExists"
      | "topics"
      | "vote"
      | "votings"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addResident",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addTopic",
    values: [string, string, BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "closeVoting", values: [string]): string;
  encodeFunctionData(
    functionFragment: "counselors",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "editTopic",
    values: [string, string, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "getTopic", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isResident",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "monthlyQuota",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfVotes",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "openVoting", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeResident",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "removeTopic", values: [string]): string;
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
  encodeFunctionData(
    functionFragment: "setCounselor",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: "topicExists", values: [string]): string;
  encodeFunctionData(functionFragment: "topics", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "votings",
    values: [BytesLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addResident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addTopic", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "closeVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "counselors", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "editTopic", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTopic", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isResident", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "monthlyQuota",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberOfVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "openVoting", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeResident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeTopic",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "residenceExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "residences", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "residents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setCounselor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "topicExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "topics", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votings", data: BytesLike): Result;
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

  addTopic: TypedContractMethod<
    [
      title: string,
      description: string,
      category: BigNumberish,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  closeVoting: TypedContractMethod<[title: string], [void], "nonpayable">;

  counselors: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  editTopic: TypedContractMethod<
    [
      topicToEdit: string,
      description: string,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  getTopic: TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicStructOutput],
    "view"
  >;

  isResident: TypedContractMethod<[resident: AddressLike], [boolean], "view">;

  manager: TypedContractMethod<[], [string], "view">;

  monthlyQuota: TypedContractMethod<[], [bigint], "view">;

  numberOfVotes: TypedContractMethod<[title: string], [bigint], "view">;

  openVoting: TypedContractMethod<[title: string], [void], "nonpayable">;

  removeResident: TypedContractMethod<
    [resident: AddressLike],
    [void],
    "nonpayable"
  >;

  removeTopic: TypedContractMethod<[title: string], [void], "nonpayable">;

  residenceExists: TypedContractMethod<
    [residence: BigNumberish],
    [boolean],
    "view"
  >;

  residences: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;

  residents: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  setCounselor: TypedContractMethod<
    [resident: AddressLike, isEntering: boolean],
    [void],
    "nonpayable"
  >;

  topicExists: TypedContractMethod<[title: string], [boolean], "view">;

  topics: TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        string
      ] & {
        title: string;
        description: string;
        status: bigint;
        createdDate: bigint;
        startDate: bigint;
        endDate: bigint;
        category: bigint;
        amount: bigint;
        responsible: string;
      }
    ],
    "view"
  >;

  vote: TypedContractMethod<
    [title: string, option: BigNumberish],
    [void],
    "nonpayable"
  >;

  votings: TypedContractMethod<
    [arg0: BytesLike, arg1: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        resident: string;
        residence: bigint;
        option: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;

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
    nameOrSignature: "addTopic"
  ): TypedContractMethod<
    [
      title: string,
      description: string,
      category: BigNumberish,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "closeVoting"
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "counselors"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "editTopic"
  ): TypedContractMethod<
    [
      topicToEdit: string,
      description: string,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getTopic"
  ): TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "isResident"
  ): TypedContractMethod<[resident: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "manager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "monthlyQuota"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "numberOfVotes"
  ): TypedContractMethod<[title: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "openVoting"
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeResident"
  ): TypedContractMethod<[resident: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeTopic"
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "residenceExists"
  ): TypedContractMethod<[residence: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residences"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residents"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "setCounselor"
  ): TypedContractMethod<
    [resident: AddressLike, isEntering: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "topicExists"
  ): TypedContractMethod<[title: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "topics"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        string
      ] & {
        title: string;
        description: string;
        status: bigint;
        createdDate: bigint;
        startDate: bigint;
        endDate: bigint;
        category: bigint;
        amount: bigint;
        responsible: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<
    [title: string, option: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "votings"
  ): TypedContractMethod<
    [arg0: BytesLike, arg1: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        resident: string;
        residence: bigint;
        option: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  filters: {};
}
