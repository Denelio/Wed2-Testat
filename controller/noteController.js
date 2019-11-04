import {noteStore} from '../services/noteStore'

let settings = {
    theme: "",
    state: "",
    sort: ""
};

export class NoteController {


    async showIndex(req, res) {
        if(settings.sort === req.query.sort){
            settings.sort = " ";
        }else {
            settings.sort = typeof req.query.sort === 'undefined' ? settings.sort: req.query.sort;
        }
        settings.theme = typeof req.query.theme === 'undefined' ? settings.theme: req.query.theme;
        settings.state = typeof req.query.state === 'undefined' ? settings.state: req.query.state;


        console.log("-----------------");
        console.log("current theme " + settings.theme);
        console.log("current state " + settings.state);
        console.log("current sort " + settings.sort);
        let notes = await noteStore.getNotes(settings.state, settings.sort);
        res.render('index', {note: notes, theme: settings.theme, state : settings.state, sort: settings.sort, layout: 'layout'});
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
        res.redirect("/");
    };

}

export const noteController = new NoteController();
