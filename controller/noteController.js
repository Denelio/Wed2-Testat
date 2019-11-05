import {noteStore} from '../services/noteStore'
//import {settings} from '../settings

let settings = {
    theme: "",
    state: "",
    sort: "",
    orientation: ""
};

export class NoteController {


    async showIndex(req, res) {

        settings.theme = typeof req.query.theme === 'undefined' ? settings.theme: req.query.theme;
        settings.state = typeof req.query.state === 'undefined' ? settings.state: req.query.state;
        settings.sort = typeof req.query.sort === 'undefined' ? settings.sort: req.query.sort;
        settings.orientation = typeof req.query.orientation === 'undefined' ? settings.orientation: req.query.orientation;

        let notes = await noteStore.getNotes(settings.state, settings.sort, settings.orientation);


        console.log("current theme " + settings.theme);
        console.log("current state " + settings.state);
        console.log("current sort " + settings.sort);
        console.log("current  orientation " + req.query.orientation);
        //let notes = await noteStore.getNotes(settings.state, settings.sort, true);
        res.render('index', {note: notes, theme: settings.theme, state : settings.state, sort: settings.sort, orientation: settings.orientation, layout: 'layout'});
    };

    createNote(req, res) {
        res.render("createNote", {layout: 'layout'});
    };

    async addNote(req, res) {
        await noteStore.add(req.body);
        res.redirect("/");
    };

    async showNote(req, res) {
        let note = await noteStore.get(req.params.id);
        await res.render("shownote", {layout: 'layout', note: note});
    };

    async updateNote(req, res) {
        await res.render("shownote", await noteStore.updateNote(req.params.id, req.body));
        res.redirect("/");
    };

}

export const noteController = new NoteController();
