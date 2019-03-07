import { DataState } from "./types";
import { Map } from "immutable";

export const data: DataState = {
    products: [
        { name: 'Product A', no: '1', description: 'product A description' },
        { name: 'Product B', no: '2', description: 'product B description' },
        { name: 'Product C', no: '3', description: 'product C description' }
    ],
    salesOrders: {
        '1': [
            { id: 'a', date: '01/01-2019', quantity: 1, remark: 'product A - order 1' },
            { id: 'b', date: '02/01-2019', quantity: 2, remark: 'product A - order 2' },
            { id: 'c', date: '03/01-2019', quantity: 2, remark: 'product A - order 3' }
        ],
        '2': [
            { id: 'd', date: '01/01-2019', quantity: 1, remark: 'product B - order 4' },
            { id: 'e', date: '02/01-2019', quantity: 2, remark: 'product B - order 5' },
            { id: 'f', date: '03/01-2019', quantity: 4, remark: 'product B - order 6' },
            { id: 'g', date: '04/01-2019', quantity: 8, remark: 'product B - order 7' }
        ],
        '3': [
            { id: 'h', date: '01/01-2019', quantity: 1, remark: 'product C - order 8' }
        ]
    },
    forecasts: {
        'a': [
            { id: 'a1', quantity : 1 },
            { id: 'a2', quantity : 2 }
        ],
        'b': [
            { id: 'b1', quantity : 3 },
            { id: 'b2', quantity : 4 }
        ],
        'c': [
            { id: 'c1', quantity : 5 },
            { id: 'c2', quantity : 6 },
            { id: 'c3', quantity : 7 },
            { id: 'c4', quantity : 8 }
        ],
        'd': [
            { id: 'd1', quantity : 9 },
            { id: 'd2', quantity : 10 }
        ],
        'e': [
            { id: 'd1', quantity : 11 }
        ],
        'f': [
            { id: 'f1', quantity : 12 },
            { id: 'f2', quantity : 13 }
        ],
        'g': [
            { id: 'g1', quantity : 14 },
            { id: 'g2', quantity : 15 },
            { id: 'g3', quantity : 16 },
            { id: 'g4', quantity : 17 }
        ],
        'h': [
            { id: 'h1', quantity : 18 },
            { id: 'h2', quantity : 19 }
        ]
    },
    changedQuantities: Map()
}
