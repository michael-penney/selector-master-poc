import { FormsState } from "./selector-master/types";

export interface Product {
    name: string,
    no: string,
    description: string
}

export interface SalesOrder {
    id: string,
    date: string,
    quantity: number,
    remark: string
}

export interface Forecast {
    id: string,
    quantity: number
}

export interface DataState {
    products: Product[],
    salesOrders: { [key: string]: SalesOrder[] },
    forecasts: { [key: string]: Forecast[] }
}

export interface StoreState {
    form: FormsState,
    data: DataState
}
