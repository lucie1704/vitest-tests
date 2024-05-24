export class Item {
    name: string;
    content: string;
    createdAt: Date;

    constructor(name: string, content: string) {
        this.name = name;
        this.content = content;
        this.createdAt = new Date();
    }

    isValid() : boolean {
        return !!this.name && !!this.content && !!this.createdAt && this.content.length <= 1000
    }
}