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
    let formattedPhoneNumber;

    const cleaned = this.phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      formattedPhoneNumber = this.phoneNumber;
    }
    formattedPhoneNumber = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

    return `${this.countryCode} ${formattedPhoneNumber}`;
  }
}
