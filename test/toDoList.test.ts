import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToDoList } from '../src/toDoList.ts';
import { User } from '../src/user.ts';
import { Item } from '../src/item.ts';

let today = new Date();
let birthDate = new Date();
birthDate.setFullYear(today.getFullYear() - 15);

const validUser = new User('john.doe@gmail.com', 'John', 'Doe', birthDate, 'Password123');
const invalidUser = new User('invalid.email', 'John', 'Doe', birthDate, 'Password123');

const validItem = new Item('Titre', 'content');

describe('ToDoList', () => {
    it('should not create toDoList if user not Valid', () => {
        invalidUser.createToDoList();
        expect(invalidUser.toDoList?.listItems).toBe(undefined);
    });

    it('should create toDoList if user valid', () => {
        validUser.createToDoList();
        expect(validUser.toDoList?.listItems).not.toBe([]);
    });

    it('should add item', () => {
        validUser.createToDoList();
        validUser.toDoList?.addItem(validItem, validUser.isValid());
        const foundItem = validUser.toDoList?.listItems.find(item => item.name == validItem.name);
        console.log(validUser.isValid());
        expect(!!foundItem).toBe(true);
    });

    it('should not add item if toDoList has 10 items', () => {
        const john = new User('john.doe@gmail.com', 'John', 'Doe', birthDate, 'Password123');
        john.createToDoList();
        for (let i = 0; i < 10; i++) {
            john.toDoList?.addItem(validItem, validUser.isValid());
        } 
        expect(() => john.toDoList?.addItem(validItem, validUser.isValid())).toThrowError('cant add item');
    });

    it('should find item that was added less than 30 minutes ago', () => {
        const john = new User('john.doe@gmail.com', 'John', 'Doe', birthDate, 'Password123');
        john.createToDoList();
        john.toDoList?.addItem(validItem, validUser.isValid());
        expect(validUser.toDoList?.canAddItem()).toBe(true);
    });

    it('should not find any item that was added under 30 minutes ago', () => {
        const mockItem = new Item('Titre', 'content');
        const createdAt = new Date(today.getTime() - 30 * 60 * 1000);
        vi.spyOn(mockItem, 'createdAt', 'get').mockReturnValue(createdAt);
        
        const john = new User('john.doe@gmail.com', 'John', 'Doe', birthDate, 'Password123');
        john.createToDoList();
        john.toDoList?.listItems.push(mockItem);
        
        expect(john.toDoList?.canAddItem()).toBe(false);
    });

    it('should not add item if last item was added less than 30 minutes ago', () => {
    });

    it('should add item if last item was added over 30 minutes ago', () => {
    });
});