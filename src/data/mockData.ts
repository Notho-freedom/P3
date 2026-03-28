export type PaymentMethod = "card" | "cash";
export type PaymentStatus = "paid" | "pending";
export type BookingStatus = "confirmed" | "pending";
export type TripKind = "planned" | "available";

export interface PersonProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  verified: boolean;
  role: string;
  memberSince: string;
  city: string;
  bio: string;
  vehicle?: string;
  languages?: string[];
  preferences?: string[];
}

export interface SearchTrip {
  id: string;
  driverId: string;
  fromCity: string;
  fromLabel: string;
  toCity: string;
  toLabel: string;
  dateLabel: string;
  departureTime: string;
  arrivalTime: string;
  pricePerSeat: number;
  seatsAvailable: number;
  kind: TripKind;
  vehicle: string;
  stopovers?: string[];
}

export interface PassengerBooking {
  id: string;
  tripId: string;
  driverId: string;
  seats: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  reference: string;
  bookedAt: string;
}

export interface DriverReservation {
  id: string;
  tripId: string;
  passengerId: string;
  seats: number;
  totalPrice: number;
  status: BookingStatus;
  requestTime: string;
}

export interface OpenDemandRequest {
  id: string;
  passengerId: string;
  fromLabel: string;
  toLabel: string;
  dateLabel: string;
  budget: number;
  details: string;
  postedAgo: string;
}

export interface IncomingDriverRequest {
  id: string;
  passengerId: string;
  price: number;
  seats: number;
  pickupLabel: string;
  destinationLabel: string;
  distanceLabel: string;
  etaLabel: string;
}

export interface ConversationItem {
  id: string;
  participantId: string;
  name: string;
  avatar: string;
  routeLabel: string;
  lastMessage: string;
  timeLabel: string;
  unread: number;
}

export interface ChatMessage {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
}

export const currentUser: PersonProfile = {
  id: "me",
  name: "Alexandre B.",
  avatar: "https://i.pravatar.cc/150?u=alexandre-b",
  rating: 4.9,
  reviews: 124,
  verified: true,
  role: "Chauffeur & passager",
  memberSince: "2022",
  city: "Paris",
  bio: "J'aime les trajets fluides, les points de rendez-vous clairs et les passagers ponctuels.",
  vehicle: "Peugeot 308 • Bleu nuit",
  languages: ["FR", "EN"],
  preferences: ["Musique ok", "Bagages ok", "Pas de cigarette"],
};

export const profiles: PersonProfile[] = [
  currentUser,
  {
    id: "sophie",
    name: "Sophie M.",
    avatar: "https://i.pravatar.cc/150?u=sophie-m",
    rating: 4.9,
    reviews: 42,
    verified: true,
    role: "Conductrice",
    memberSince: "2021",
    city: "Paris",
    bio: "Je fais Paris -> Lyon plusieurs fois par semaine. Je confirme vite et je partage les details du rendez-vous par chat.",
    vehicle: "Renault Megane • Gris ardoise",
    languages: ["FR"],
    preferences: ["Animaux ok", "Chargeur telephone", "Discussion legere"],
  },
  {
    id: "marc",
    name: "Marc D.",
    avatar: "https://i.pravatar.cc/150?u=marc-d",
    rating: 4.7,
    reviews: 58,
    verified: true,
    role: "Conducteur",
    memberSince: "2020",
    city: "Paris",
    bio: "Je fais surtout des trajets directs. Ideal si tu veux partir vite et voyager leger.",
    vehicle: "Tesla Model 3 • Blanche",
    languages: ["FR", "EN"],
    preferences: ["Silence possible", "Bagages cabine"],
  },
  {
    id: "julie",
    name: "Julie L.",
    avatar: "https://i.pravatar.cc/150?u=julie-l",
    rating: 5.0,
    reviews: 31,
    verified: true,
    role: "Conductrice disponible",
    memberSince: "2023",
    city: "Paris",
    bio: "Je roule en mode dispo dans Paris sud et vers Lyon centre quand la demande colle a ma route.",
    vehicle: "Citroen C4 • Sable",
    languages: ["FR"],
    preferences: ["Petits bagages", "Ponctualite"],
  },
  {
    id: "paul",
    name: "Paul T.",
    avatar: "https://i.pravatar.cc/150?u=paul-t",
    rating: 4.8,
    reviews: 12,
    verified: true,
    role: "Passager",
    memberSince: "2024",
    city: "Paris",
    bio: "Je reserve souvent tot et je confirme rapidement mes horaires.",
  },
  {
    id: "lea",
    name: "Lea K.",
    avatar: "https://i.pravatar.cc/150?u=lea-k",
    rating: 4.6,
    reviews: 9,
    verified: true,
    role: "Passagere",
    memberSince: "2024",
    city: "Lyon",
    bio: "Je voyage avec un sac cabine et j'aime les trajets bien organises.",
  },
];

export const searchTrips: SearchTrip[] = [
  {
    id: "trip-1",
    driverId: "sophie",
    fromCity: "Paris",
    fromLabel: "Paris • Gare de Lyon",
    toCity: "Lyon",
    toLabel: "Lyon • Part-Dieu",
    dateLabel: "Aujourd'hui",
    departureTime: "14:30",
    arrivalTime: "18:00",
    pricePerSeat: 25,
    seatsAvailable: 2,
    kind: "planned",
    vehicle: "Renault Megane",
    stopovers: ["Melun", "Auxerre"],
  },
  {
    id: "trip-2",
    driverId: "marc",
    fromCity: "Paris",
    fromLabel: "Paris sud • Porte d'Orleans",
    toCity: "Lyon",
    toLabel: "Lyon centre • Perrache",
    dateLabel: "Aujourd'hui",
    departureTime: "16:00",
    arrivalTime: "19:20",
    pricePerSeat: 22,
    seatsAvailable: 3,
    kind: "planned",
    vehicle: "Tesla Model 3",
    stopovers: [],
  },
  {
    id: "trip-3",
    driverId: "julie",
    fromCity: "Paris",
    fromLabel: "Paris 13e • Bibliotheque",
    toCity: "Lyon",
    toLabel: "Lyon centre • Bellecour",
    dateLabel: "Disponible maintenant",
    departureTime: "Immediat",
    arrivalTime: "18:35",
    pricePerSeat: 20,
    seatsAvailable: 1,
    kind: "available",
    vehicle: "Citroen C4",
    stopovers: ["Evry"],
  },
];

export const passengerBookings: PassengerBooking[] = [
  {
    id: "booking-1",
    tripId: "trip-1",
    driverId: "sophie",
    seats: 1,
    totalPrice: 25,
    paymentMethod: "card",
    paymentStatus: "paid",
    status: "confirmed",
    reference: "RF-8492-X",
    bookedAt: "Aujourd'hui",
  },
  {
    id: "booking-2",
    tripId: "trip-2",
    driverId: "marc",
    seats: 2,
    totalPrice: 44,
    paymentMethod: "cash",
    paymentStatus: "pending",
    status: "pending",
    reference: "RF-9150-Z",
    bookedAt: "Demain",
  },
];

export const driverReservations: DriverReservation[] = [
  {
    id: "reservation-1",
    tripId: "trip-1",
    passengerId: "paul",
    seats: 1,
    totalPrice: 25,
    status: "pending",
    requestTime: "Il y a 5 min",
  },
  {
    id: "reservation-2",
    tripId: "trip-3",
    passengerId: "lea",
    seats: 2,
    totalPrice: 40,
    status: "confirmed",
    requestTime: "Il y a 1 h",
  },
];

export const openDemandRequests: OpenDemandRequest[] = [
  {
    id: "demand-1",
    passengerId: "paul",
    fromLabel: "Paris 13e",
    toLabel: "Orleans centre",
    dateLabel: "Aujourd'hui • 18:00",
    budget: 15,
    details: "1 sac cabine, depart flexible de 30 min.",
    postedAgo: "Il y a 10 min",
  },
  {
    id: "demand-2",
    passengerId: "lea",
    fromLabel: "Lyon • Part-Dieu",
    toLabel: "Dijon",
    dateLabel: "Demain • 07:30",
    budget: 18,
    details: "Je prefere un trajet direct. Petit bagage uniquement.",
    postedAgo: "Il y a 1 h",
  },
];

export const incomingDriverRequests: IncomingDriverRequest[] = [
  {
    id: "incoming-1",
    passengerId: "paul",
    price: 12,
    seats: 2,
    pickupLabel: "Gare Centrale",
    destinationLabel: "Technopole",
    distanceLabel: "1.2 km",
    etaLabel: "Dans 5 min",
  },
];

export const conversations: ConversationItem[] = [
  {
    id: "conv-1",
    participantId: "sophie",
    name: "Sophie M.",
    avatar: "https://i.pravatar.cc/150?u=sophie-m",
    routeLabel: "Paris -> Lyon",
    lastMessage: "Parfait, on se retrouve devant la gare.",
    timeLabel: "10:30",
    unread: 2,
  },
  {
    id: "conv-2",
    participantId: "marc",
    name: "Marc D.",
    avatar: "https://i.pravatar.cc/150?u=marc-d",
    routeLabel: "Paris sud -> Lyon centre",
    lastMessage: "Avez-vous une place pour une valise cabine ?",
    timeLabel: "Hier",
    unread: 0,
  },
  {
    id: "conv-3",
    participantId: "paul",
    name: "Paul T.",
    avatar: "https://i.pravatar.cc/150?u=paul-t",
    routeLabel: "Demande ouverte Paris -> Orleans",
    lastMessage: "Merci, je confirme pour 18h.",
    timeLabel: "Lun",
    unread: 0,
  },
];

export const conversationThreads: Record<string, ChatMessage[]> = {
  "conv-1": [
    { id: 1, sender: "me", text: "Bonjour, le point de rdv est bien devant la gare ?", time: "10:15" },
    { id: 2, sender: "other", text: "Oui, juste au depose-minute, porte 2.", time: "10:20" },
    { id: 3, sender: "other", text: "Parfait, on se retrouve devant la gare.", time: "10:30" },
  ],
  "conv-2": [
    { id: 1, sender: "other", text: "Avez-vous une place pour une valise cabine ?", time: "Hier" },
    { id: 2, sender: "me", text: "Oui, aucun souci, merci de l'indiquer.", time: "Hier" },
  ],
  "conv-3": [
    { id: 1, sender: "other", text: "Merci, je confirme pour 18h.", time: "Lun" },
    { id: 2, sender: "me", text: "Parfait, je partage le point precis en approchant.", time: "Lun" },
  ],
};

export const publicReviews: Record<string, string[]> = {
  sophie: [
    "Ponctuelle et tres claire sur le point de rendez-vous.",
    "Trajet fluide, conduite rassurante et bonne communication.",
  ],
  marc: [
    "Trajet direct et efficace.",
    "Tres reactif dans le chat avant le depart.",
  ],
  julie: [
    "Super flexible en mode dispo.",
    "Accepte vite quand la demande colle a sa zone.",
  ],
};

export function getProfileById(profileId?: string | null) {
  return profiles.find((profile) => profile.id === profileId) ?? currentUser;
}

export function getTripById(tripId?: string | null) {
  return searchTrips.find((trip) => trip.id === tripId) ?? searchTrips[0];
}

export function getPassengerBookingById(bookingId?: string | null) {
  return passengerBookings.find((booking) => booking.id === bookingId) ?? passengerBookings[0];
}

export function getDriverReservationById(reservationId?: string | null) {
  return driverReservations.find((reservation) => reservation.id === reservationId) ?? driverReservations[0];
}

export function getConversationById(conversationId?: string | null) {
  return conversations.find((conversation) => conversation.id === conversationId) ?? conversations[0];
}
