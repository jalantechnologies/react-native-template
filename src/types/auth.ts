import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

export class AccessToken {
  accountId: string;
  token: string;

  constructor(json: any) {
    this.accountId = json.account_id as string;
    this.token = json.token as string;
  }
}

export class PhoneNumber {
  countryCode: string;
  phoneNumber: string;

  constructor(json: { country_code: string; phone_number: string }) {
    this.countryCode = json.country_code;
    this.phoneNumber = json.phone_number;
  }

  getFormattedPhoneNumber(): string {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const fullNumber = `+${this.countryCode}${this.phoneNumber}`;
      const parsed = phoneUtil.parse(fullNumber, '');
      return phoneUtil.format(parsed, PhoneNumberFormat.INTERNATIONAL);
    } catch (e) {
      return `+${this.countryCode}${this.phoneNumber}`;
    }
  }

  getFormattedWithoutCountryCode(): string {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const fullNumber = `+${this.countryCode}${this.phoneNumber}`;
      const parsed = phoneUtil.parse(fullNumber, '');
      return phoneUtil.format(parsed, PhoneNumberFormat.NATIONAL);
    } catch (e) {
      return this.phoneNumber;
    }
  }
}
