import Gadget from './Gadget';

export default class Laptop extends Gadget {
    constructor(
        id: number,
        name: string,
        brand: string,
        readonly diagonal: string,
        price: number,
    ) {
        super(id, name, brand, price);
    }
}
