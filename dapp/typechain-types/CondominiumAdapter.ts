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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace CondominiumLib {
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
}

export interface CondominiumAdapterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addResident"
      | "addTopic"
      | "closeVoting"
      | "editTopic"
      | "getImplementationAddress"
      | "getManager"
      | "getQuota"
      | "getResident"
      | "getResidents"
      | "getTopic"
      | "getTopics"
      | "getVotes"
      | "openVoting"
      | "owner"
      | "payQuota"
      | "removeResident"
      | "removeTopic"
      | "setCounselor"
      | "transfer"
      | "upgrade"
      | "vote"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ManagerChanged"
      | "QuotaChanged"
      | "TopicChanged"
      | "Transfer"
  ): EventFragment;

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
    functionFragment: "editTopic",
    values: [string, string, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getImplementationAddress",
    values?: undefined
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
  encodeFunctionData(functionFragment: "openVoting", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
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
    functionFragment: "setCounselor",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "upgrade",
    values: [AddressLike]
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
  decodeFunctionResult(functionFragment: "editTopic", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getImplementationAddress",
    data: BytesLike
  ): Result;
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
  decodeFunctionResult(functionFragment: "openVoting", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
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
    functionFragment: "setCounselor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
}

export namespace ManagerChangedEvent {
  export type InputTuple = [manager: AddressLike];
  export type OutputTuple = [manager: string];
  export interface OutputObject {
    manager: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace QuotaChangedEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TopicChangedEvent {
  export type InputTuple = [
    topicId: BytesLike,
    title: string,
    status: BigNumberish
  ];
  export type OutputTuple = [topicId: string, title: string, status: bigint];
  export interface OutputObject {
    topicId: string;
    title: string;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    to: AddressLike,
    amount: BigNumberish,
    topic: string
  ];
  export type OutputTuple = [to: string, amount: bigint, topic: string];
  export interface OutputObject {
    to: string;
    amount: bigint;
    topic: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CondominiumAdapter extends BaseContract {
  connect(runner?: ContractRunner | null): CondominiumAdapter;
  waitForDeployment(): Promise<this>;

  interface: CondominiumAdapterInterface;

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

  getImplementationAddress: TypedContractMethod<[], [string], "view">;

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

  openVoting: TypedContractMethod<[title: string], [void], "nonpayable">;

  owner: TypedContractMethod<[], [string], "view">;

  payQuota: TypedContractMethod<[residence: BigNumberish], [void], "payable">;

  removeResident: TypedContractMethod<
    [resident: AddressLike],
    [void],
    "nonpayable"
  >;

  removeTopic: TypedContractMethod<[title: string], [void], "nonpayable">;

  setCounselor: TypedContractMethod<
    [resident: AddressLike, isEntering: boolean],
    [void],
    "nonpayable"
  >;

  transfer: TypedContractMethod<
    [title: string, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  upgrade: TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
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
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
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
    nameOrSignature: "getImplementationAddress"
  ): TypedContractMethod<[], [string], "view">;
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
    nameOrSignature: "openVoting"
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "payQuota"
  ): TypedContractMethod<[residence: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "removeResident"
  ): TypedContractMethod<[resident: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeTopic"
  ): TypedContractMethod<[title: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setCounselor"
  ): TypedContractMethod<
    [resident: AddressLike, isEntering: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [title: string, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "upgrade"
  ): TypedContractMethod<
    [newImplementation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<
    [title: string, option: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ManagerChanged"
  ): TypedContractEvent<
    ManagerChangedEvent.InputTuple,
    ManagerChangedEvent.OutputTuple,
    ManagerChangedEvent.OutputObject
  >;
  getEvent(
    key: "QuotaChanged"
  ): TypedContractEvent<
    QuotaChangedEvent.InputTuple,
    QuotaChangedEvent.OutputTuple,
    QuotaChangedEvent.OutputObject
  >;
  getEvent(
    key: "TopicChanged"
  ): TypedContractEvent<
    TopicChangedEvent.InputTuple,
    TopicChangedEvent.OutputTuple,
    TopicChangedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "ManagerChanged(address)": TypedContractEvent<
      ManagerChangedEvent.InputTuple,
      ManagerChangedEvent.OutputTuple,
      ManagerChangedEvent.OutputObject
    >;
    ManagerChanged: TypedContractEvent<
      ManagerChangedEvent.InputTuple,
      ManagerChangedEvent.OutputTuple,
      ManagerChangedEvent.OutputObject
    >;

    "QuotaChanged(uint256)": TypedContractEvent<
      QuotaChangedEvent.InputTuple,
      QuotaChangedEvent.OutputTuple,
      QuotaChangedEvent.OutputObject
    >;
    QuotaChanged: TypedContractEvent<
      QuotaChangedEvent.InputTuple,
      QuotaChangedEvent.OutputTuple,
      QuotaChangedEvent.OutputObject
    >;

    "TopicChanged(bytes32,string,uint8)": TypedContractEvent<
      TopicChangedEvent.InputTuple,
      TopicChangedEvent.OutputTuple,
      TopicChangedEvent.OutputObject
    >;
    TopicChanged: TypedContractEvent<
      TopicChangedEvent.InputTuple,
      TopicChangedEvent.OutputTuple,
      TopicChangedEvent.OutputObject
    >;

    "Transfer(address,uint256,string)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
