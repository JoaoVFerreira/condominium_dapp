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
  export type TopicUpdateStruct = {
    topicId: BytesLike;
    title: string;
    status: BigNumberish;
    category: BigNumberish;
  };

  export type TopicUpdateStructOutput = [
    topicId: string,
    title: string,
    status: bigint,
    category: bigint
  ] & { topicId: string; title: string; status: bigint; category: bigint };

  export type ResidentStruct = {
    wallet: AddressLike;
    residence: BigNumberish;
    isCounselor: boolean;
    isManager: boolean;
    nextPayment: BigNumberish;
  };

  export type ResidentStructOutput = [
    wallet: string,
    residence: bigint,
    isCounselor: boolean,
    isManager: boolean,
    nextPayment: bigint
  ] & {
    wallet: string;
    residence: bigint;
    isCounselor: boolean;
    isManager: boolean;
    nextPayment: bigint;
  };

  export type ResidentPageStruct = {
    residents: CondominiumLib.ResidentStruct[];
    total: BigNumberish;
  };

  export type ResidentPageStructOutput = [
    residents: CondominiumLib.ResidentStructOutput[],
    total: bigint
  ] & { residents: CondominiumLib.ResidentStructOutput[]; total: bigint };

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

  export type TopicPageStruct = {
    topics: CondominiumLib.TopicStruct[];
    total: BigNumberish;
  };

  export type TopicPageStructOutput = [
    topics: CondominiumLib.TopicStructOutput[],
    total: bigint
  ] & { topics: CondominiumLib.TopicStructOutput[]; total: bigint };

  export type VoteStruct = {
    resident: AddressLike;
    residence: BigNumberish;
    option: BigNumberish;
    timestamp: BigNumberish;
  };

  export type VoteStructOutput = [
    resident: string,
    residence: bigint,
    option: bigint,
    timestamp: bigint
  ] & {
    resident: string;
    residence: bigint;
    option: bigint;
    timestamp: bigint;
  };

  export type TransferReceiptStruct = {
    to: AddressLike;
    amount: BigNumberish;
    topic: string;
  };

  export type TransferReceiptStructOutput = [
    to: string,
    amount: bigint,
    topic: string
  ] & { to: string; amount: bigint; topic: string };
}

export interface CondominiumInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addResident"
      | "addTopic"
      | "closeVoting"
      | "counselors"
      | "editTopic"
      | "getManager"
      | "getQuota"
      | "getResident"
      | "getResidents"
      | "getTopic"
      | "getTopics"
      | "getVotes"
      | "isResident"
      | "manager"
      | "monthlyQuota"
      | "numberOfVotes"
      | "openVoting"
      | "payQuota"
      | "removeResident"
      | "removeTopic"
      | "residenceExists"
      | "residences"
      | "residents"
      | "setCounselor"
      | "topicExists"
      | "topics"
      | "transfer"
      | "vote"
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
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "editTopic",
    values: [string, string, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getQuota", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getResident",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getResidents",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getTopic", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getTopics",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getVotes", values: [string]): string;
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
    functionFragment: "payQuota",
    values: [BigNumberish]
  ): string;
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
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCounselor",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: "topicExists", values: [string]): string;
  encodeFunctionData(
    functionFragment: "topics",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [string, BigNumberish]
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
  decodeFunctionResult(functionFragment: "getManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getQuota", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getResident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getResidents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTopic", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTopics", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "payQuota", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
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

  closeVoting: TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;

  counselors: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  editTopic: TypedContractMethod<
    [
      topicToEdit: string,
      description: string,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;

  getManager: TypedContractMethod<[], [string], "view">;

  getQuota: TypedContractMethod<[], [bigint], "view">;

  getResident: TypedContractMethod<
    [resident: AddressLike],
    [CondominiumLib.ResidentStructOutput],
    "view"
  >;

  getResidents: TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [CondominiumLib.ResidentPageStructOutput],
    "view"
  >;

  getTopic: TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicStructOutput],
    "view"
  >;

  getTopics: TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [CondominiumLib.TopicPageStructOutput],
    "view"
  >;

  getVotes: TypedContractMethod<
    [topicTitle: string],
    [CondominiumLib.VoteStructOutput[]],
    "view"
  >;

  isResident: TypedContractMethod<[resident: AddressLike], [boolean], "view">;

  manager: TypedContractMethod<[], [string], "view">;

  monthlyQuota: TypedContractMethod<[], [bigint], "view">;

  numberOfVotes: TypedContractMethod<[title: string], [bigint], "view">;

  openVoting: TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;

  payQuota: TypedContractMethod<[residence: BigNumberish], [void], "payable">;

  removeResident: TypedContractMethod<
    [resident: AddressLike],
    [void],
    "nonpayable"
  >;

  removeTopic: TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;

  residenceExists: TypedContractMethod<
    [residence: BigNumberish],
    [boolean],
    "view"
  >;

  residences: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;

  residents: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, boolean, bigint] & {
        wallet: string;
        residence: bigint;
        isCounselor: boolean;
        isManager: boolean;
        nextPayment: bigint;
      }
    ],
    "view"
  >;

  setCounselor: TypedContractMethod<
    [resident: AddressLike, isEntering: boolean],
    [void],
    "nonpayable"
  >;

  topicExists: TypedContractMethod<[title: string], [boolean], "view">;

  topics: TypedContractMethod<
    [arg0: BigNumberish],
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

  transfer: TypedContractMethod<
    [title: string, amount: BigNumberish],
    [CondominiumLib.TransferReceiptStructOutput],
    "nonpayable"
  >;

  vote: TypedContractMethod<
    [title: string, option: BigNumberish],
    [void],
    "nonpayable"
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
  ): TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "counselors"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "editTopic"
  ): TypedContractMethod<
    [
      topicToEdit: string,
      description: string,
      amount: BigNumberish,
      responsible: AddressLike
    ],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getManager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getQuota"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getResident"
  ): TypedContractMethod<
    [resident: AddressLike],
    [CondominiumLib.ResidentStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getResidents"
  ): TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [CondominiumLib.ResidentPageStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTopic"
  ): TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTopics"
  ): TypedContractMethod<
    [page: BigNumberish, pageSize: BigNumberish],
    [CondominiumLib.TopicPageStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getVotes"
  ): TypedContractMethod<
    [topicTitle: string],
    [CondominiumLib.VoteStructOutput[]],
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
  ): TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "payQuota"
  ): TypedContractMethod<[residence: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "removeResident"
  ): TypedContractMethod<[resident: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeTopic"
  ): TypedContractMethod<
    [title: string],
    [CondominiumLib.TopicUpdateStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "residenceExists"
  ): TypedContractMethod<[residence: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residences"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "residents"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, boolean, bigint] & {
        wallet: string;
        residence: bigint;
        isCounselor: boolean;
        isManager: boolean;
        nextPayment: bigint;
      }
    ],
    "view"
  >;
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
    [arg0: BigNumberish],
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
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [title: string, amount: BigNumberish],
    [CondominiumLib.TransferReceiptStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<
    [title: string, option: BigNumberish],
    [void],
    "nonpayable"
  >;

  filters: {};
}
