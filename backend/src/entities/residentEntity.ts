export enum Profile {
  RESIDENT = 0,
  COUNSELOR = 1,
  MANAGER = 2
}

export class ResidentEntity {
  id?: number;
  wallet: string;
  name: string;
  profile: Profile;
  phone?: string;
  email?: string;

  constructor(data: ResidentEntity.Params) {
    this.wallet = data.wallet;
    this.name = data.name;
    this.profile = data.profile ?? Profile.RESIDENT;
    this.phone = data.phone;
    this.email = data.email;
  }
}

export namespace ResidentEntity {
  export type Params = {
    id?: number;
    wallet: string;
    name: string;
    profile: Profile;
    phone?: string;
    email?: string;
  };
}