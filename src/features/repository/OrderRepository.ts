import { baseURL } from "../../BaseUrl";

export class OrderRepository {
    static async getAllOrders() {
        const res = await fetch(`${baseURL}/api/orders`);
        return await res.json();
    }
}