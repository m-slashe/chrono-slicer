export class Issue {

    name: string;
    link = 'http://www.google.com';

    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getLink() {
        return this.link;
    }
}
