import { PhoneNumber } from './auth';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  username: string;

  constructor(json: any) {
    this.id = json.id as string;
    this.firstName = json.firstName as string;
    this.lastName = json.lastName as string;
    this.phoneNumber = new PhoneNumber(json.phoneNumber);
    this.username = json.username as string;
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
