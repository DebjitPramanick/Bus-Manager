export type Bus = {
  id: number;
  name: string;
  route_id: string;
  capacity: number;
  route: Route;
};

export type BusCreate = Pick<Bus, "name" | "route_id" | "capacity">;

export type BusUpdate = Partial<BusCreate>;

export type Passenger = {
  id: number;
  name: string;
  route_id: string;
  bus_id: string | null;
  route: Route;
  bus: Bus;
};

export type PassengerCreate = Pick<Passenger, "name" | "route_id">;

export type PassengerUpdate = Partial<
  Pick<Passenger, "name" | "route_id" | "bus_id">
>;

export type BusSlot = {
  id: number;
  slot_number: number;
  is_occupied: boolean;
  bus_id: string;
  bus: Bus;
};

export type BusSlotCreate = Pick<BusSlot, "slot_number" | "bus_id">;

export type BusSlotUpdate = Partial<BusSlotCreate>;

export type Route = {
  id: number;
  line: string;
};

export type RouteCreate = Pick<Route, "line">;

export type RouteUpdate = Pick<Route, "line">;

export type PassengersState = {
  data: Passenger[];
  isLoading: boolean;
  error: string | undefined;
};

export type BusesState = {
  data: Bus[];
  isLoading: boolean;
  error: string | undefined;
};

export type BusSlotsState = {
  data: BusSlot[];
  isLoading: boolean;
  error: string | undefined;
};

export type RoutesState = {
  data: Route[];
  isLoading: boolean;
  error: string | undefined;
};
