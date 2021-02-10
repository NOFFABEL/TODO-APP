export class Todo {
  constructor(
    public id: number,
    public title: string,
    public start: string,
    public ended: string,
    public done: boolean
  ) {}
}
