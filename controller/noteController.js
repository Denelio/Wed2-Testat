import {noteStore} from '../services/noteStore'

export class NoteController {


    async showIndex(req, res) {
        await res.render("index" , await noteStore.getNotes());
    };

    createNote(req, res) {
        res.render("createNote");
    };

    async createPizza(req, res) {
        await res.render("succeeded", await noteStore.add(req.body, "unkown"));
    };

    async showNote(req, res) {
        await res.render("showorder", await noteStore.get(req.params.id));
    };

    async updateNote(req, res) {
        await res.render("showorder", await noteStore.updateNote(req.params.id, req.body));
    };

}

export const noteController = new NoteController();