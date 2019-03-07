import { Forecast } from "./types";
import { Action } from "redux";

export enum ActionType {
    SET_FORECASTS = 'example.SET_FORECASTS'
}

export function setForecasts(id: string, forecasts: Forecast[]): SetForecastsAction {
    return {
        type: ActionType,
        id, forecasts
    }
}

export interface SetForecastsAction extends Action {
    id: string,
    forecasts: Forecast[]
};
