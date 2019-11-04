import Datastore from 'nedb-promise'

class Note {
    constructor(noteData) {
        this.state = typeof noteData.state === 'undefined' ? 'active': noteData.state;
        this.title = noteData.title;
        this.content = noteData.content;
        this.importance = noteData.importance;
        this.date_due = noteData.date_due;
        this.date = new Date().toISOString();
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/note.db', autoload: true});
    }

    async add(noteData) {
        let note = new Note(noteData);
        return await this.db.insert(note);
    }

    async updateNote(id, noteData) {
        await this.db.update({_id: id}, {$set: {"title": noteData.title,
                "content": noteData.content,
                "importance": noteData.importance,
                "date_due": noteData.date_due,
                "state": noteData.state}}, { multi: false });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async getNotes(state, sort) {
        let notes = {};
        if(state ==="true"){
            notes =  await this.db.find({state: "active"});
        }else{
            notes = await this.db.find({});
        }

        return notes.sort(sortByProperty(sort));
    }
}

function sortByProperty(property){
    return function(a,b){
        if(a[property] > b[property])
            return 1;
        else if(a[property] < b[property])
            return -1;

        return 0;
    }
}

export const noteStore = new NoteStore();
