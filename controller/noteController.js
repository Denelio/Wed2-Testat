import {noteStore} from '../services/noteStore'
import {settings} from '../settings'


export class NoteController {


    async showIndex(req, res) {

        settings.setTheme(typeof req.query.theme === 'undefined' ? settings.getTheme(): req.query.theme);
        settings.setState(typeof req.query.state === 'undefined' ? settings.getState(): req.query.state);
        settings.setSort(typeof req.query.sort === 'undefined' ? settings.getSort(): req.query.sort);
        settings.setOrientatin(typeof req.query.orientation === 'undefined' ? settings.getOrientation(): req.query.orientation);

        let notes = await noteStore.getNotes(settings.getState(), settings.getSort(), settings.getOrientation());


        console.log("current theme " + settings.getTheme());
        console.log("current state " + settings.getState());
        console.log("current sort " + settings.getSort());
        console.log("current  orientation " + settings.getOrientation());
        res.render('index', {note: notes, theme: settings.getTheme(), state : settings.getState(), sort: settings.getSort(), orientation: settings.getOrientation(), layout: 'layout'});
    };

    createNote(req, res) {
        res.render("createNote", {layout: 'layout', theme: settings.getTheme(), title: "Create Note"});
    };

    async addNote(req, res) {
        await noteStore.add(req.body);
        res.redirect("/");
    };

    async showNote(req, res) {
        let note = await noteStore.get(req.params.id);
        res.render("createNote", {layout: 'layout', theme: settings.getTheme(),title: "Edit Note", note: note});
    };

    async updateNote(req, res) {
        await await noteStore.updateNote(req.params.id, req.body);
        res.redirect("/");
    };

}

export const noteController = new NoteController();
