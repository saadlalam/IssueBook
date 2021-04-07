export enum Status {
  OPEN = 'Open',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed'
}


export interface Comment {
  id: string;
  content: string;
  avatar: string;
  replier: string;
  time: Date;
}

export class Issue {
  id: string | undefined;
  title: string | undefined;
  creationDate: Date | undefined;
  updateDate: Date | undefined;
  environment: string | undefined;
  description: string | undefined;
  reporter: string | undefined;
  shot: string | undefined;
  status: Status | undefined;
}
