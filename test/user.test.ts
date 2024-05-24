import { describe, it, expect, expectTypeOf } from 'vitest';
import { User } from '../src/user.ts';
import { ToDoList } from '../src/toDoList.ts';

const validEmail = 'test@example.com';
const validFirstname = 'John';
const validName = 'Doe';
const validPassword = 'Password123';

const currentDate = new Date();
currentDate.setFullYear(currentDate.getFullYear() - 14);
const validBirthDate = currentDate;

const currentDate_2 = new Date();
currentDate_2.setFullYear(currentDate_2.getFullYear() - 13);
const exactBirthDate = currentDate_2;

const currentDate_3 = new Date();
currentDate.setFullYear(currentDate.getFullYear() - 12);
const wrongBirthDate = currentDate_3;

describe('User', () => {
  describe('isOver13', () => {
    it('should return true if the user is over 13 years old', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      expect(user.isOver13()).toBe(true);
    });

    it('should return false if the user is exactly 13 years old', () => {
      const user = new User(validEmail, validFirstname, validName, exactBirthDate, validPassword);
      expect(user.isOver13()).toBe(true);
    });

    it('should return false if the user is under 13 years old', () => {
      const user = new User(validEmail, validFirstname, validName, wrongBirthDate, validPassword);
      expect(user.isOver13()).toBe(false);
    });
  });
  describe('isValidEmail', () => {
    it('should return true if the user\'s email is valid', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      expect(user.isValidEmail()).toBe(true);
    });
    it('should return false if the user\'s email is wrong', () => {
      const user = new User('', validFirstname, validName, validBirthDate, validPassword);
      expect(user.isValidEmail()).toBe(false);
    });
  });
  describe('isValidPassword', () => {
    it('should return true if the user\'s password is valid', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      expect(user.isValidPassword()).toBe(true);
    });
    it('should return false if the password is under 8 characters', () => {
      const shortPassword = 'Pass123'
      const user = new User(validEmail, validFirstname, validName, validBirthDate, shortPassword);
      expect(user.isValidPassword()).toBe(false);
    });
    it('should return false if the password is over 40 characters', () => {
      const longPassword = 'Pass1233333333333333333333333333333333333'
      const user = new User(validEmail, validFirstname, validName, validBirthDate, longPassword);
      expect(user.isValidPassword()).toBe(false);
    });
    it('should return false if the password does not contain a lowercase letter', () => {
      const UpperCasePassword = validPassword.toUpperCase();
      const user = new User(validEmail, validFirstname, validName, validBirthDate, UpperCasePassword);
      expect(user.isValidPassword()).toBe(false);
    });
    it('should return false if the password does not contain a lowercase letter', () => {
      const lowerCasePassword = validPassword.toLowerCase();
      const user = new User(validEmail, validFirstname, validName, validBirthDate, lowerCasePassword);
      expect(user.isValidPassword()).toBe(false);
    });
    it('should return false if the password does not contain a number', () => {
      const passwordWithoutNb = "Password"
      const user = new User(validEmail, validFirstname, validName, validBirthDate, passwordWithoutNb);
      expect(user.isValidPassword()).toBe(false);
    });
  });
  describe('isValid', () => {
    it('should return true if the user meets all the requirements', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      expect(user.isValid()).toBe(true);
    });
    it('should return false if the firstname is empty', () => {
      const user = new User(validEmail, '', validName, validBirthDate, validPassword);
      expect(user.isValid()).toBe(false);
    });
    it('should return false if the name is empty', () => {
      const user = new User(validEmail, validFirstname, '', validBirthDate, validPassword);
      expect(user.isValid()).toBe(false);
    });
    it('should return false if the password is empty', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, '');
      expect(user.isValid()).toBe(false);
    });
    it('should return false if the mail is empty', () => {
      const user = new User('', validFirstname, validName, validBirthDate, validPassword);
      expect(user.isValid()).toBe(false);
    });
    it('should return false if the birthDate is wrong', () => {
      const user = new User('', validFirstname, validName, wrongBirthDate, validPassword);
      expect(user.isValid()).toBe(false);
    });
  });
  describe('createToDoList', () => {
    it('should return a ToDoList if the user meets all the requirements', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      expectTypeOf(user.createToDoList()).toBeArray;
    });
    it('should return false if the user doesnt meet all the requirements', () => {
      const user = new User(validEmail, validFirstname, validName, wrongBirthDate, validPassword);
      expect(user.createToDoList()).toBe(false);
    });
    it('should return false if the user already has a ToDoList', () => {
      const user = new User(validEmail, validFirstname, validName, validBirthDate, validPassword);
      user.toDoList = new ToDoList();
      expect(user.createToDoList()).toBe(false);
    });
  });
});
