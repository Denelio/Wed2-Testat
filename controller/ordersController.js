import {orderStore} from '../services/orderStore'

export class OrdersController {


    async showIndex(req, res) {
        await res.render("index" , await orderStore.all());
    };

    createOrder(req, res) {
        res.render("newOrder");
    };

    async createPizza(req, res) {
        await res.render("succeeded", await orderStore.add(req.body, "unkown"));
    };

    async showOrder(req, res) {
        await res.render("showorder", await orderStore.get(req.params.id));
    };

    async deleteOrder(req, res) {
        await res.render("showorder", await orderStore.delete(req.params.id));
    };

}

export const ordersController = new OrdersController();