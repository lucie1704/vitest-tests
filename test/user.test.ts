import { describe, it, expect } from 'vitest';
import { User } from '../src/user.ts';
import { ToDoList } from '../src/toDoList.ts';

// Mock de ToDoList pour éviter des dépendances non nécessaires
class MockToDoList extends ToDoList {
  constructor() {
    super();
  }
}

describe('User Class', () => {
  const validEmail = 'test@example.com';
  const validFirstname = 'John';
  const validName = 'Doe';
  // const validBirthDate = new Date('2000-01-01');
  // const validBirthDate = new Date() - 
  // const validBirthDate = validBirthDate.setFullYear(currentDate.getFullYear() - 15);
  const validPassword = 'Password123';
  let currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 13);
  let validBirthDate = currentDate;
  let currentDate_2 = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 14);
  let wrongBirthDate = currentDate_2;


  ///////
  it('should be true because age is over 13', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
    expect(user.isValid()).toBe(true);
  });

  it('should create a user with valid properties', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);

    expect(user.email).toBe(validEmail);
    expect(user.firstname).toBe(validFirstname);
    expect(user.name).toBe(validName);
    expect(user.birthDate).toBe(validBirthDate);
    expect(user.password).toBe(validPassword);
  });

  it('should validate a correct email format', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
    const invalidEmail = 'invalid-email';

    expect(user['isValidEmail'](validEmail)).toBe(true);
    expect(user['isValidEmail'](invalidEmail)).toBe(false);
  });

  it('should validate age is over 13', () => {
    const underageBirthDate = new Date(new Date().getFullYear() - 12, 0, 1);
    const user = new User(validEmail, validFirstname, validName, underageBirthDate, validPassword);

    expect(user['isOver13'](validBirthDate)).toBe(true);
    expect(user['isOver13'](underageBirthDate)).toBe(false);
  });

  it('should validate password meets criteria', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);

    expect(user.isValidPassword('Short1')).toBe(false);
    expect(user.isValidPassword('nouppercase1')).toBe(false);
    expect(user.isValidPassword('NOLOWERCASE1')).toBe(false);
    expect(user.isValidPassword('NoNumber')).toBe(false);
    expect(user.isValidPassword(validPassword)).toBe(true);
  });

  it('should validate the user correctly', () => {
    const invalidUser = new User('invalid-email', '', '', validBirthDate, 'short');
    const validUser = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);

    expect(invalidUser.isValid()).toBe(false);
    expect(validUser.isValid()).toBe(true);
  });

  it('should create a ToDoList if user is valid and does not have one', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);

    expect(user.toDoList).toBeUndefined();
    user.createToDoList();
    expect(user.toDoList).toBeInstanceOf(MockToDoList);
  });

  it('should not create a ToDoList if user already has one', () => {
    const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
    user.toDoList = new MockToDoList();

    user.createToDoList();
    expect(user.toDoList).toBeInstanceOf(MockToDoList);
  });

  it('should not create a ToDoList if user is invalid', () => {
    const invalidUser = new User('invalid-email', '', '', validBirthDate, 'short');

    invalidUser.createToDoList();
    expect(invalidUser.toDoList).toBeUndefined();
  });
});
