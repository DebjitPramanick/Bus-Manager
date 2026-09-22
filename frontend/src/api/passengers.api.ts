import type { PassengerCreate, PassengerUpdate } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

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

export const assignPassengerToBus = async (
  bus_id: number,
  passenger_id: number,
) => {
  const response = await fetch(`${API_URL}/passengers/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bus_id, passenger_id }),
  });
  return response.json();
};
