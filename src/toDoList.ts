import type { User } from "./user.ts";
import { Item } from "./item.ts";

export class ToDoList {
  listItems: Array<Item>;

  constructor() {
    this.listItems = [];
  }

  isCreatedWithinLast30Minutes(item: Item): boolean {
    const now: Date = new Date();
    const createdAt: Date = new Date(item.createdAt);
    const difference: number = now.getTime() - createdAt.getTime();
    const differenceInMinutes: number = difference / (1000 * 60);
    return differenceInMinutes <= 30;
  }

  canAddItem(): boolean {
    return this.listItems.some(item => !this.isCreatedWithinLast30Minutes(item)) ? false : true
  }

  addItem(item: Item, validUser: boolean): void {
    if(
      validUser 
      && item.isValid() 
      && this.listItems.length < 10
      && this.canAddItem()
    ){
      this.listItems.push(item);
    }
    else {
      throw new Error('cant add item');
    }
  }
}
