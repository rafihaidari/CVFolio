export interface Slot {
  start: string;
}

export interface SlotsResponse {
  status: 'success' | 'error';
  data?: {
    [date: string]: Slot[];
  };
  error?: string;
}

export interface BookingAttendee {
  name: string;
  email: string;
  timeZone: string;
  language?: string;
}

export interface BookingPayload {
  username: string;
  eventTypeSlug: string;
  start: string; // ISO 8601 string
  attendee: BookingAttendee;
  notes?: string;
  guests?: string[];
}

export interface BookingResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

// Cleans VITE_CALCOM_API_KEY from quotes or extra spacing
const getApiKey = () => {
  const rawKey = import.meta.env.VITE_CALCOM_API_KEY || '';
  return rawKey.replace(/['"]/g, '').trim();
};

// In dev: use Vite proxy (/calcom-api → https://api.cal.eu/v2)
// In prod: direct call (CORS headers from cal.eu allow *)
const getApiBase = () => {
  if (import.meta.env.DEV) {
    return '/calcom-api';
  }
  const origin = import.meta.env.VITE_CALCOM_ORIGIN || 'https://cal.com';
  const isEu = origin.includes('cal.eu');
  return isEu ? 'https://api.cal.eu/v2' : 'https://api.cal.com/v2';
};

/**
 * Fetch available time slots for a given Cal.com username and event slug.
 */
export async function fetchAvailableSlots(
  username: string,
  eventTypeSlug: string,
  start: string,
  end: string,
  timeZone: string
): Promise<SlotsResponse> {
  const apiKey = getApiKey();
  const apiBase = getApiBase();

  const url = new URL(`${apiBase}/slots`, window.location.origin);
  url.searchParams.append('username', username);
  url.searchParams.append('eventTypeSlug', eventTypeSlug);
  url.searchParams.append('start', start);
  url.searchParams.append('end', end);
  url.searchParams.append('timeZone', timeZone);

  try {
    const headers: Record<string, string> = {
      // Correct version for the slots endpoint
      'cal-api-version': '2024-09-04',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedErr: any;
      try { parsedErr = JSON.parse(errText); } catch (_) { /* ignore */ }
      const errMsg = parsedErr?.error?.message || parsedErr?.message || errText;
      throw new Error(errMsg || `Failed to fetch slots: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in fetchAvailableSlots:', error);
    return {
      status: 'error',
      error: error.message || 'Unknown error occurred while fetching availability slots.',
    };
  }
}

/**
 * Create a new booking.
 */
export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  const apiKey = getApiKey();
  const apiBase = getApiBase();

  const url = `${apiBase}/bookings`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'cal-api-version': '2024-08-13',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const body: Record<string, any> = {
      username: payload.username,
      eventTypeSlug: payload.eventTypeSlug,
      start: payload.start,
      attendee: {
        name: payload.attendee.name,
        email: payload.attendee.email,
        timeZone: payload.attendee.timeZone,
        language: payload.attendee.language || 'en',
      },
      bookingFieldsResponses: {} as Record<string, any>,
    };

    // Notes go ONLY inside bookingFieldsResponses (not root level)
    if (payload.notes) {
      body.bookingFieldsResponses.notes = payload.notes;
    }

    // Guests array
    if (payload.guests && payload.guests.length > 0) {
      body.guests = payload.guests;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedErr: any;
      try { parsedErr = JSON.parse(errText); } catch (_) { /* ignore */ }
      const errMsg = parsedErr?.error?.message || parsedErr?.message || errText;
      throw new Error(errMsg || `Failed to create booking: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in createBooking:', error);
    return {
      status: 'error',
      error: error.message || 'Unknown error occurred while booking the slot.',
    };
  }
}
