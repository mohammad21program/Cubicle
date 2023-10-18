import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {encryptTransform} from "redux-persist-transform-encrypt";

const persistConfig = {
    key: "root",
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'my-super-secret-key',
            onError: function (error) {
                console.log(error)
            },
        }),
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

export const persist = persistStore(store);
export default store