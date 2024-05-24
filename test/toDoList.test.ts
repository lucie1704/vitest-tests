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
    validUser.createToDoList();
    invalidUser = new User('invalid.email', 'John', 'Doe', birthDate, 'Password123');
    invalidUser.createToDoList();
    validItem = new Item('Titre', 'content');
});

describe('ToDoList', () => {
    it('should not create toDoList if user not Valid', () => {
        expect(invalidUser.toDoList?.listItems).toBe(undefined);
    });

    it('should create toDoList if user valid', () => {
        expect(validUser.toDoList?.listItems).not.toBe([]);
    });

    it('should return true for item added under 30 minutes ago', () => {
        const createdAt = new Date(today.getTime() - 20 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        expect(validUser.toDoList?.isCreatedWithinLast30Minutes(validItem)).toBe(true);
    });

    it('should return false for item added under 30 minutes ago', () => {
        const createdAt = new Date(today.getTime() - 40 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        expect(validUser.toDoList?.isCreatedWithinLast30Minutes(validItem)).toBe(false);
    });

    it('should not be able to addItems if item was last added less than 30 minutes ago', () => {
        const createdAt = new Date(today.getTime() - 40 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        validUser.toDoList?.listItems.push(validItem);
        expect(validUser.toDoList?.canAddItem()).toBe(true);
    })

    it('should be able to addItems if item was last added over 30 minutes ago', () => {
        const createdAt = new Date(today.getTime() - 20 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        validUser.toDoList?.listItems.push(validItem);
        expect(validUser.toDoList?.canAddItem()).toBe(false);
    })

    it('should not add item if last item was added less than 30 minutes ago', () => {
        const mockItem = new Item('Titre', 'content');
        const createdAt = new Date(today.getTime() - 20 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        validUser.toDoList?.listItems.push(validItem);
        expect(() => validUser.toDoList?.addItem(mockItem, validUser.isValid())).toThrowError('cant add item');
    });

    it('should add item if last item was added over 30 minutes ago', () => {
        const mockItem = new Item('Titre', 'content');
        const createdAt = new Date(today.getTime() - 40 * 60 * 1000);
        vi.spyOn(validItem, 'createdAt', 'get').mockReturnValue(createdAt);
        validUser.toDoList?.listItems.push(validItem);
        expect(() => validUser.toDoList?.addItem(mockItem, validUser.isValid())).toThrowError('save item');
    });

    it('should throw error on saveItem', () => {
        expect(() => validUser.toDoList?.saveItem()).toThrowError('save item');
    });

    it('should save on addItem', () => {
        expect(() => validUser.toDoList?.addItem(validItem, validUser.isValid())).toThrowError('save item');
    });

    it('should not add item if toDoList has 10 items', () => {
        for (let i = 0; i < 10; i++) {
            validUser.toDoList?.listItems.push(validItem);
        } 
        expect(() => validUser.toDoList?.addItem(validItem, validUser.isValid())).toThrowError('cant add item');
    });
});