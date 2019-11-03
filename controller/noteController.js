import {noteStore} from '../services/noteStore'

export class NoteController {


    async showIndex(req, res) {

        //console.log(notes);
        //await res.render("index" , await noteStore.getNotes());
        //await res.render("index", {note : notes, theme: "dark"});
        let test = req.query.theme;
        console.log(test);
        let notes = await noteStore.getNotes(req.query.state);
        res.render('index', {note: notes, theme: req.query.theme, state : req.query.state});
    };

    createNote(req, res) {
        res.render("createNote");
    };

    async createPizza(req, res) {
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

export const noteController = new NoteController();
