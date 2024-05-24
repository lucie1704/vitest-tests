import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToDoList } from '../src/toDoList.ts';
import { User } from '../src/user.ts';
import { Item } from '../src/item.ts';

let today = new Date();
let birthDate = new Date();
birthDate.setFullYear(today.getFullYear() - 15);

let validUser: User;
let invalidUser: User;
let validItem: Item;

beforeEach(() => {
    validUser = new User('john.doe@gmail.com', 'John', 'Doe', birthDate, 'Password123');
    invalidUser = new User('invalid.email', 'John', 'Doe', birthDate, 'Password123');
    validItem = new Item('Titre', 'content');
});

describe('ToDoList', () => {
    it('should not create toDoList if user not Valid', () => {
        invalidUser.createToDoList();
        expect(invalidUser.toDoList?.listItems).toBe(undefined);
    });

    it('should create toDoList if user valid', () => {
        validUser.createToDoList();
        expect(validUser.toDoList?.listItems).not.toBe([]);
    });

    it('should find item that was added less than 30 minutes ago', () => {
        validUser.createToDoList();
        validUser.toDoList?.addItem(validItem, validUser.isValid());
        expect(validUser.toDoList?.canAddItem()).toBe(true);
    });

    it.only('should return true for item added under 30 minutes ago', () => {
        validUser.createToDoList();
        const createdAt = new Date(today.getTime() - 20 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        expect(validUser.toDoList?.isCreatedWithinLast30Minutes(validItem)).toBe(true);
    });

    it.only('should return false for item added under 30 minutes ago', () => {
        validUser.createToDoList();
        const createdAt = new Date(today.getTime() - 40 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        expect(validUser.toDoList?.isCreatedWithinLast30Minutes(validItem)).toBe(false);
    });

    it('should not add item if last item was added less than 30 minutes ago', () => {
        const mockItem = new Item('Titre', 'content');
        let createdAt: Date = new Date(today.getTime() - (20 * 60 * 1000));
        vi.spyOn(mockItem, 'createdAt', 'get').mockReturnValue(createdAt);
        
        validUser.createToDoList();
        validUser.toDoList?.listItems.push(mockItem);
        
        expect(validUser.toDoList?.canAddItem()).toBe(false);
    });

    it('should add item if last item was added over 30 minutes ago', () => {
        const mockItem = new Item('Titre', 'content');
        let createdAt: Date = new Date(today.getTime() - (40 * 60 * 1000));
        vi.spyOn(mockItem, 'createdAt', 'get').mockReturnValue(createdAt);
        
        validUser.createToDoList();
        validUser.toDoList?.listItems.push(mockItem);
        
        expect(validUser.toDoList?.canAddItem()).toBe(true);
    });

    it('should add item', () => {
        validUser.createToDoList();
        validUser.toDoList?.addItem(validItem, validUser.isValid());
        const foundItem = validUser.toDoList?.listItems.find(item => item.name == validItem.name);
        expect(!!foundItem).toBe(true);
    });

    it('should not add item if toDoList has 10 items', () => {
        validUser.createToDoList();
        for (let i = 0; i < 10; i++) {
            validUser.toDoList?.addItem(validItem, validUser.isValid());
        } 
        expect(() => validUser.toDoList?.addItem(validItem, validUser.isValid())).toThrowError('cant add item');
    });
});