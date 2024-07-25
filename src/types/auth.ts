export class AccessToken {
  accountId: string;
  token: string;

  constructor(json: any) {
    this.accountId = json.accountId as string;
    this.token = json.token as string;
  }
}

export class PhoneNumber {
  countryCode: string;
  phoneNumber: string;

  constructor(json: any) {
    this.countryCode = json.countryCode as string;
    this.phoneNumber = json.phoneNumber as string;
  }

  getFormattedPhoneNumber(): string {
    return `${this.countryCode} ${this.phoneNumber}`;
  }
}
