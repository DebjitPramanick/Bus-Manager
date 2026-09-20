import type { BusSlotCreate, BusSlotUpdate } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getSlots = async () => {
  const response = await fetch(`${API_URL}/slots`);
  return response.json();
};

export const addSlot = async (slot: BusSlotCreate) => {
  const response = await fetch(`${API_URL}/slots`, {
    method: "POST",
    body: JSON.stringify(slot),
  });
  return response.json();
};

export const updateSlot = async (id: string, slot: BusSlotUpdate) => {
  const response = await fetch(`${API_URL}/slots/${id}`, {
    method: "PUT",
    body: JSON.stringify(slot),
  });
  return response.json();
};

export const deleteSlot = async (id: string) => {
  const response = await fetch(`${API_URL}/slots/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
