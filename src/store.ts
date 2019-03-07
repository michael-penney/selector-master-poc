import { createStore, combineReducers } from 'redux';
import formReducers from './selector-master/reducers';
import dataReducers from './dataReducers';

export const store = createStore(combineReducers({
        form: formReducers,
        data: dataReducers
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
