import type { RouteCreate, RouteUpdate } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getRoutes = async () => {
  const response = await fetch(`${API_URL}/routes`);
  return response.json();
};

export const addRoute = async (route: RouteCreate) => {
  const response = await fetch(`${API_URL}/routes`, {
    method: "POST",
    body: JSON.stringify(route),
  });
  return response.json();
};

export const updateRoute = async (id: string, route: RouteUpdate) => {
  const response = await fetch(`${API_URL}/routes/${id}`, {
    method: "PUT",
    body: JSON.stringify(route),
  });
  return response.json();
};

export const deleteRoute = async (id: string) => {
  const response = await fetch(`${API_URL}/routes/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
