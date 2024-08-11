export class Task {
  id: string;
  title: string;
  description: string;

  constructor(json: any) {
    this.id = json.id as string;
    this.title = json.title as string;
    this.description = json.description as string;
  }
}
