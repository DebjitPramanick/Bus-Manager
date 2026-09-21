import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import type { BusSlot, BusSlotCreate, BusSlotUpdate } from "../../types";

export const getSlots = createAsyncThunk("slots/getSlots", async () => {
  const response = await api.getSlots();
  return response;
});

export const addSlot = createAsyncThunk(
  "slots/addSlot",
  async (slot: BusSlotCreate) => {
    const response = await api.addSlot(slot);
    return response;
  },
);

export const updateSlot = createAsyncThunk(
  "slots/updateSlot",
  async ({ id, slot }: { id: string; slot: BusSlotUpdate }) => {
    const response = await api.updateSlot(id, slot);
    return response;
  },
);

export const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    data: [] as BusSlot[],
    isLoading: false,
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSlots.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getSlots.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getSlots.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
    builder.addCase(addSlot.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addSlot.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addSlot.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
  },
});
