import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import * as api from "../../api";
import type { Bus, BusCreate, BusUpdate, StoreState } from "../../types";

export const getBuses = createAsyncThunk("buses/getBuses", async () => {
  const response = await api.getBuses();
  return response;
});

export const addBus = createAsyncThunk(
  "buses/addBus",
  async (bus: BusCreate) => {
    const response = await api.addBus(bus);
    return response;
  },
);

export const updateBus = createAsyncThunk(
  "buses/updateBus",
  async ({ id, bus }: { id: string; bus: BusUpdate }) => {
    const response = await api.updateBus(id, bus);
    return response;
  },
);

export const availableBusesSelector = createSelector(
  [(state: StoreState) => state.buses.data],
  (buses) => {
    return buses.filter((bus) => bus.is_available);
  },
);

export const busesSlice = createSlice({
  name: "buses",
  initialState: {
    data: [] as Bus[],
    isLoading: false,
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBuses.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getBuses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getBuses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
    builder.addCase(addBus.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addBus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addBus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
  },
});
