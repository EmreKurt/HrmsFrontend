import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootAuthReducer from "./rootAuthReducer";
import rootReducer from "./rootReducer";

export function configureStore(){
    return createStore(rootAuthReducer,devToolsEnhancer())
}

