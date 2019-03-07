import { DataState } from "./types";
import { data } from './data';
import { Action } from "redux";
import { SetForecastsAction, ActionType } from "./dataActions";

export default function(state: DataState = data, action: Action) {
    switch (action.type) {
        case ActionType.SET_FORECASTS:
            return handleSetForecasts(state, action as SetForecastsAction);
    }
    
    return state;
}

function handleSetForecasts(state: DataState, { id, forecasts }: SetForecastsAction) {
    return Object.assign({ forecasts: Object.assign(state.forecasts, { [id]: forecasts }) });
}
