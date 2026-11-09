import Gadget from './Gadget';

export default class Smartphone extends Gadget {
    constructor(
        id: number,
        name: string,
        brand: string,
        readonly model: string,
        price: number,
    ) {
        super(id, name, brand, price);
    }
}
