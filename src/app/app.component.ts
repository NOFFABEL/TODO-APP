import { Component } from "@angular/core";
import { Todo } from "src/models/todos";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  public mode = "list";
  public title = "LISTE DES TÂCHES";
  public todos: Todo[];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    const now = moment().format('LLLL');
    this.todos.push(new Todo(id, title, now, null, false));
    this.save();
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    const now = moment().format('LLLL');
    todo.ended = now;
    console.log(now);
    
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    todo.ended = null;
    this.save();
  }

  save() {
    let todos = this.todos;
    const data = JSON.stringify(todos);

    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

}
