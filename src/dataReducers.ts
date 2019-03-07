import { DataState } from "./types";
import { data } from './data';
import { Action } from "redux";
import { SetChangedQuantityAction, ActionType } from "./dataActions";

export default function(state: DataState = data, action: Action) {
    switch (action.type) {
        case ActionType.SET_CHANGED_QUANTITY:
            return handleSetChangedQuantity(state, action as SetChangedQuantityAction);
    }
    
    return state;
}

function handleSetChangedQuantity(state: DataState, { id, quantity }: SetChangedQuantityAction): DataState {
    const changedQuantities = state.changedQuantities.set(id, quantity);
    return { ...state, changedQuantities };
}
