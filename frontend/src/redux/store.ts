import { configureStore } from "@reduxjs/toolkit";
import { passengersSlice } from "./slices/passengers.slice";
import { busesSlice } from "./slices/buses.slice";
import { routesSlice } from "./slices/routes.slice";
import { slotsSlice } from "./slices/slots.slice";

export const store = configureStore({
  reducer: {
    passengers: passengersSlice.reducer,
    buses: busesSlice.reducer,
    routes: routesSlice.reducer,
    slots: slotsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
