import { Reservation, BookingStatus } from '../types';

const DB_KEY = 'lizard_king_reservations';

export const db = {
  getReservations: (): Reservation[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  getReservationById: (id: string): Reservation | undefined => {
    return db.getReservations().find(r => r.id === id);
  },

  saveReservation: (res: Reservation): void => {
    const reservations = db.getReservations();
    const index = reservations.findIndex(r => r.id === res.id);
    if (index > -1) {
      reservations[index] = res;
    } else {
      reservations.push(res);
    }
    localStorage.setItem(DB_KEY, JSON.stringify(reservations));
  },

  updateStatus: (id: string, status: BookingStatus): Reservation | null => {
    const res = db.getReservationById(id);
    if (res) {
      res.status = status;
      db.saveReservation(res);
      return res;
    }
    return null;
  }
};

// A parti d'ici c'est serieux 


const API_URL = "https://lkreservation-api.rf.gd/lkreservation-backend/api";

export async function payReservation(reference: string, email: string) {
  const response = await fetch(`${API_URL}/pay-reservation.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ reference, email }),
  });

  return response.json();
}