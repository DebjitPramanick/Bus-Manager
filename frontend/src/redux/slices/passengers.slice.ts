import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import type { Passenger, PassengerCreate, PassengerUpdate } from "../../types";

export const getPassengers = createAsyncThunk(
  "passengers/getPassengers",
  async () => {
    const response = await api.getPassengers();
    return response;
  },
);

export const addPassenger = createAsyncThunk(
  "passengers/addPassenger",
  async (passenger: PassengerCreate) => {
    const response = await api.addPassenger(passenger);
    return response;
  },
);

export const updatePassenger = createAsyncThunk(
  "passengers/updatePassenger",
  async ({ id, passenger }: { id: string; passenger: PassengerUpdate }) => {
    const response = await api.updatePassenger(id, passenger);
    return response;
  },
);

export const passengersSlice = createSlice({
  name: "passengers",
  initialState: {
    data: [] as Passenger[],
    isLoading: false,
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPassengers.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getPassengers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getPassengers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
    builder.addCase(addPassenger.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addPassenger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addPassenger.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
  },
});
