import { ToDoList } from "./toDoList.ts";

export class User {
  email: string;
  firstname: string;
  name: string;
  birthDate: Date;
  password: string;
  toDoList?: ToDoList;

  constructor(email: string, firstname: string, name: string, birthDate: Date, password: string) {
    this.email = email;
    this.firstname = firstname;
    this.name = name;
    this.birthDate = birthDate;
    this.password = password;
  }

  isValidEmail(email: string = this.email): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isOver13(birthDate: Date = this.birthDate): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age > 13;
    }
    return age >= 13;
  }

  isValidPassword(password : string = this.password) : boolean {
    if (password.length < 8 || password.length > 40) {
      return false;
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasLowerCase && hasUpperCase && hasNumber;
  }

  isValid(): boolean {
    return this.isValidEmail(this.email) &&
           this.firstname.trim().length > 0 &&
           this.name.trim().length > 0 &&
           this.isOver13(this.birthDate) &&
           this.isValidPassword(this.password);
  }

  createToDoList(): boolean|ToDoList {
    if(this.isValid() && this.toDoList == undefined){
      this.toDoList = new ToDoList();
      return this.toDoList;
    }
    return false;
  }
}
