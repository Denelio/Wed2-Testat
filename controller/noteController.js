import {noteStore} from '../services/noteStore'

export class NoteController {


    async showIndex(req, res) {
        await res.render("index" , await noteStore.all());
    };

    createNote(req, res) {
        res.render("createNote");
    };

    async createPizza(req, res) {
        await res.render("succeeded", await noteStore.add(req.body, "unkown"));
    };

    async showOrder(req, res) {
        await res.render("showorder", await noteStore.get(req.params.id));
    };

    async deleteOrder(req, res) {
        await res.render("showorder", await noteStore.delete(req.params.id));
    };

}

export const noteController = new NoteController();