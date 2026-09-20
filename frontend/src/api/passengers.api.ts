import type { PassengerCreate, PassengerUpdate } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getPassengers = async () => {
  const response = await fetch(`${API_URL}/passengers`);
  return response.json();
};

export const addPassenger = async (passenger: PassengerCreate) => {
  const response = await fetch(`${API_URL}/passengers`, {
    method: "POST",
    body: JSON.stringify(passenger),
  });
  return response.json();
};

export const updatePassenger = async (
  id: string,
  passenger: PassengerUpdate,
) => {
  const response = await fetch(`${API_URL}/passengers/${id}`, {
    method: "PUT",
    body: JSON.stringify(passenger),
  });
  return response.json();
};

export const deletePassenger = async (id: string) => {
  const response = await fetch(`${API_URL}/passengers/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
