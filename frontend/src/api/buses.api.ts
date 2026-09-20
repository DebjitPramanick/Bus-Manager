import type { BusCreate, BusUpdate } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getBuses = async () => {
  const response = await fetch(`${API_URL}/buses`);
  return response.json();
};

export const addBus = async (bus: BusCreate) => {
  const response = await fetch(`${API_URL}/buses`, {
    method: "POST",
    body: JSON.stringify(bus),
  });
  return response.json();
};

export const updateBus = async (id: string, bus: BusUpdate) => {
  const response = await fetch(`${API_URL}/buses/${id}`, {
    method: "PUT",
    body: JSON.stringify(bus),
  });
  return response.json();
};

export const deleteBus = async (id: string) => {
  const response = await fetch(`${API_URL}/buses/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
