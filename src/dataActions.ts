import { Action } from "redux";

export enum ActionType {
    SET_CHANGED_QUANTITY = 'example.SET_CHANGED_QUANTITY'
}

export function setChangedQuantity(id: string, quantity: number): SetChangedQuantityAction {
    return {
        type: ActionType.SET_CHANGED_QUANTITY, id, quantity
    };
}

export interface SetChangedQuantityAction extends Action<ActionType> {
    id: string,
    quantity: number
};
