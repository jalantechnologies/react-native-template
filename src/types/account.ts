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
}
