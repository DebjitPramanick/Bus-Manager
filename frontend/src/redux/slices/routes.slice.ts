import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import type { Route, RouteCreate } from "../../types";

export const getRoutes = createAsyncThunk("routes/getRoutes", async () => {
  const response = await api.getRoutes();
  return response;
});

export const addRoute = createAsyncThunk(
  "routes/addRoute",
  async (route: RouteCreate) => {
    const response = await api.addRoute(route);
    return response;
  },
);

export const routesSlice = createSlice({
  name: "routes",
  initialState: {
    data: [] as Route[],
    isLoading: false,
    error: undefined as string | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoutes.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getRoutes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRoutes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
    builder.addCase(addRoute.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addRoute.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addRoute.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? undefined;
    });
  },
});
