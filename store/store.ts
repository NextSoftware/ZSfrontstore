import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import { createWrapper } from "next-redux-wrapper";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import itemCountReducer from "../slices/itemCountSlice";
import userReducer from "../slices/userSlice"

// defenir os root reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  itemCount: itemCountReducer,
  user: userReducer,
});

// configuração da store e aplicar os reducers
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

// configurar a store
export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // isto persiste as variaveis no client side
    const persistConfig = {
      key: "nextE",
      whitelist: ["cart", "itemCount", "user"], // ter keys diferentes
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk:true
      }),
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

// exportar a store, o seu Thunk e a sua State
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
// wrapper para colcoar no app.tsx
export const wrapper = createWrapper(makeStore, {debug: false});
