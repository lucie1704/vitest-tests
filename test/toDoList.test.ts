import { describe, expect, it } from 'vitest';
import { ToDoList } from '../src/toDoList.ts';
import { User } from '../src/user.ts';
import { Item } from '../src/item.ts';

let today = new Date();
let birthDate = new Date();
birthDate.setFullYear(today.getFullYear() - 15);

const jojo = new User('jojo', 'Doe', 'jojo.doe@gmail.com', birthDate, 'passwOrd123');
jojo.createToDoList(); 

const validItem = new Item('Titre', 'content');

describe('ToDoList', () => {
    it('should not create toDoList if user not Valid', () => {
        const john = new User('John', 'Doe', 'john.doe.com', birthDate, 'passwOrd123');
        john.createToDoList();
        expect(john.toDoList?.listItems).toBe(undefined);
    });

    it('should create toDoList if user valid', () => {
        const john = new User('John', 'Doe', 'john.doe@gmail.com', birthDate, 'passwOrd123');
        john.createToDoList();
        expect(john.toDoList?.listItems).not.toBe([]);
    });

    it('should not add item if toDoList has 10 items', () => {
        for (let i = 0; i < 10; i++) {
            jojo.toDoList?.addItem(validItem, jojo.isValid());
        } 
        expect(() => jojo.toDoList?.addItem(validItem, jojo.isValid()).toThrowError('cant add item'));
    });

    it('should add item', () => {
        const john = new User('John', 'Doe', 'john.doe@gmail.com', birthDate, 'passwOrd123');
        john.createToDoList();
        john.toDoList?.addItem(validItem, john.isValid());
        const foundItem = jojo.toDoList?.listItems.find(item => item.name === validItem.name);
        expect(!!foundItem).toBe(true);
    });

    it('should find item that was added less than 30 minutes ago', () => {
    });

    it('should not find any item that was added under 30 minutes ago', () => {
    });

    it('should not add item if last item was added less than 30 minutes ago', () => {
    });

    it('should add item if last item was added over 30 minutes ago', () => {
    });
});