import { PhoneNumber } from './auth';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber | null;
  username: string;

  constructor(json: any) {
    this.id = json.id as string;
    this.firstName = json.first_name;
    this.lastName = json.last_name;
    this.username = json.username as string;

    if (json.phone_number) {
      this.phoneNumber = new PhoneNumber({
        countryCode: json.phone_number.country_code ?? json.phone_number.countryCode,
        phoneNumber: json.phone_number.phone_number ?? json.phone_number.phoneNumber,
      });
    } else if (json.phoneNumber) {
      this.phoneNumber = new PhoneNumber(json.phoneNumber);
    } else {
      this.phoneNumber = null;
    }
  }

  displayName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  initials(): string {
    const parts = this.displayName()
      .split(' ')
      .filter(word => word.length > 0);
    if (parts.length === 0) {
      return '';
    }
    if (parts.length === 1) {
      return parts[0].charAt(0);
    }
    const first = parts[0].charAt(0);
    const last = parts[parts.length - 1].charAt(0);
    return `${first}${last}`.toUpperCase();
  }
}
