import {noteStore} from '../services/noteStore'

let settings = {
    theme: "",
    state: "",
    sort: ""
};

export class NoteController {


    async showIndex(req, res) {
        settings.theme = typeof req.query.theme === 'undefined' ? settings.theme: req.query.theme;
        settings.state = typeof req.query.state === 'undefined' ? settings.state: req.query.state;
        settings.sort = typeof req.query.sort === 'undefined' ? settings.sort: req.query.sort;
        console.log("-----------------")
        console.log("current theme " + settings.theme);
        console.log("current state " + settings.state);
        let notes = await noteStore.getNotes(settings.state);
        notes.sort(sortByProperty(settings.sort));
        res.render('index', {note: notes, theme: settings.theme, state : settings.state, sort: settings.sort});
    };

    createNote(req, res) {
        res.render("createNote");
    };

    async addNote(req, res) {
        await await noteStore.add(req.body);
        res.redirect("/");
    };

    async showNote(req, res) {
        await res.render("showorder", await noteStore.get(req.params.id));
    };

    async updateNote(req, res) {
        await res.render("showorder", await noteStore.updateNote(req.params.id, req.body));
    };

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

export const noteController = new NoteController();
