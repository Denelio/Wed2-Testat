import Datastore from 'nedb-promise'

export class Order {
    constructor(pizzaName, orderedBy) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

class Note {
    constructor(noteData) {
        this.state = 'active';
        this.title = noteData.title;
        this.content = noteData.content;
        this.importance = noteData.importance;
        this.date_due = noteData.date_due;
        this.date = new Date().toISOString();
    }
}

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/note.db', autoload: true});
    }

    async add(noteDate) {
        let note = new Note(noteDate);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "finished"}}, { multi: false });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async getAllNotes(callback) {
        console.log("success");
        return await this.db.find({}, callback);
    }

    async all() {
        return await this.db.find({});
    }
}

export const orderStore = new OrderStore();
