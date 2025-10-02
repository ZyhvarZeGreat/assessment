export interface Connection {
  id: string;
  name: string;
  username: string;
  email: string;
  location: string;
  status: "active" | "inactive";
  lastLogin: string;
  bio?: string;
  city?: string;
  country?: string;
}

export const connections: Connection[] = [
  {
    id: "1",
    name: "Tanaka",
    username: "tanaka_j",
    email: "tanaka@example.com",
    location: "California",
    status: "inactive",
    lastLogin: "01/15/24 3:30pm",
  },
  {
    id: "2",
    name: "Smith",
    username: "smith_m",
    email: "smith123@gmail.com",
    location: "Texas",
    status: "active",
    lastLogin: "11/21/23 9:00am",
  },
  {
    id: "3",
    name: "Johnson",
    username: "johnson_f",
    email: "johnson@hotmail.com",
    location: "Florida",
    status: "active",
    lastLogin: "03/12/24 1:45pm",
  },
  {
    id: "4",
    name: "Garcia",
    username: "garcia_r",
    email: "garcia@yahoo.com",
    location: "New York",
    status: "inactive",
    lastLogin: "02/28/24 7:15pm",
  },
  {
    id: "5",
    name: "Lee",
    username: "lee_f",
    email: "lee@outlook.com",
    location: "Illinois",
    status: "active",
    lastLogin: "10/05/23 4:50pm",
  },
  {
    id: "6",
    name: "Kim",
    username: "kim_m",
    email: "kim@gmail.com",
    location: "Washington",
    status: "inactive",
    lastLogin: "08/19/23 2:30pm",
  },
  {
    id: "7",
    name: "Martinez",
    username: "martinez_f",
    email: "martinez@gmail.com",
    location: "Nevada",
    status: "active",
    lastLogin: "07/10/23 10:00am",
  },
  {
    id: "8",
    name: "Hernandez",
    username: "hernandez_m",
    email: "hernandez@mail.com",
    location: "Oregon",
    status: "inactive",
    lastLogin: "09/25/23 8:00pm",
  },
  {
    id: "9",
    name: "Nguyen",
    username: "nguyen_f",
    email: "nguyen@example.com",
    location: "California",
    status: "active",
    lastLogin: "12/01/23 11:20am",
  },
  {
    id: "10",
    name: "Kumar",
    username: "kumar_f",
    email: "kumar@example.com",
    location: "Texas",
    status: "active",
    lastLogin: "11/30/23 3:15pm",
  },
  {
    id: "11",
    name: "Chen",
    username: "chen_f",
    email: "chen@example.com",
    location: "New York",
    status: "active",
    lastLogin: "10/22/23 5:45pm",
  },
  {
    id: "12",
    name: "Patel",
    username: "patel_f",
    email: "patel@example.com",
    location: "Illinois",
    status: "inactive",
    lastLogin: "09/15/23 1:00pm",
  },
];

export const profileDetails: Record<string, Connection & { city: string; country: string; bio: string }> = {
  "1": {
    id: "1",
    name: "Jiro Tanaka",
    username: "joshheart3495",
    email: "tanaka@example.com",
    location: "California",
    city: "Kyoto",
    country: "Japan",
    status: "inactive",
    lastLogin: "01/15/24 3:30pm",
    bio: "I'm a data scientist residing in Kyoto, passionate about leveraging machine learning to solve complex problems.",
  },
};

export const searchSuggestions = [
  { name: "Seraphina", username: "@seraphina_l" },
  { name: "Sergio", username: "@sergio_g" },
  { name: "Serenity", username: "@serenity_w" },
];
