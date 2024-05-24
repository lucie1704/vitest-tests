import { describe, expect, it } from 'vitest';
import { Item } from '../src/item.ts';

describe('Item', () => {
    it('should return true for valid item', () => {
        const item = new Item('Valid Name', 'Valid Content');
        expect(item.isValid()).toBe(true);
    });

    it('should return false for item with empty name', () => {
        const item = new Item('', 'Valid Content');
        expect(item.isValid()).toBe(false);
    });

    it('should return false for item with empty content', () => {
        const item = new Item('Valid Name', '');
        expect(item.isValid()).toBe(false);
    });

    it('should return false for item with content longer than 1000 characters', () => {
        const longContent = 'a'.repeat(1001);
        const item = new Item('Valid Name', longContent);
        expect(item.isValid()).toBe(false);
    });
});