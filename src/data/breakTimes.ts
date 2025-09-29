// School break times configuration
export interface BreakTime {
  id: number;
  name: string;
  start: string; // HH:MM format
  end: string;   // HH:MM format
}

export const breakTimes: BreakTime[] = [
  {
    id: 1,
    name: "1. Teneffüs",
    start: "09:40",
    end: "10:00"
  },
  {
    id: 2,
    name: "2. Teneffüs",
    start: "10:40  ",
    end: "10:55"
  },
  {
    id: 3,
    name: "3.Tenefüs",
    start: "11:35",
    end: "11:55"
  },
  {
    id: 4,
    name: "4. Teneffüs",
    start: "12:30",
    end: "13:00"
  },
  {
    id: 5,
    name: "5. Teneffüs",
    start: "13:40",
    end: "13:55"
  },
  {
    id: 6,
    name: "6  . Teneffüs",
    start: "14:35",
    end: "14:50 "
  }
];