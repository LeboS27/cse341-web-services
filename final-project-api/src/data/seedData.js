const events = [
  {
    title: 'Career Prep Workshop',
    description: 'Students practice resumes, interviews, and professional introductions.',
    location: 'Student Success Center',
    startDate: '2026-10-05T15:00:00.000Z',
    endDate: '2026-10-05T17:00:00.000Z',
    category: 'career',
    capacity: 40,
    isPublic: true,
    organizerEmail: 'careers@example.edu',
  },
  {
    title: 'Service Saturday',
    description: 'Campus volunteers help clean and prepare local community gardens.',
    location: 'North Parking Lot',
    startDate: '2026-10-10T08:00:00.000Z',
    endDate: '2026-10-10T12:00:00.000Z',
    category: 'service',
    capacity: 75,
    isPublic: true,
    organizerEmail: 'service@example.edu',
  },
  {
    title: 'Web Services Study Night',
    description: 'Peer-led review for APIs, routes, validation, and MongoDB.',
    location: 'Library Room 204',
    startDate: '2026-10-14T18:00:00.000Z',
    endDate: '2026-10-14T20:00:00.000Z',
    category: 'academic',
    capacity: 25,
    isPublic: false,
    organizerEmail: 'cse341@example.edu',
  },
];

const volunteers = [
  {
    firstName: 'Maya',
    lastName: 'Ndlovu',
    email: 'maya@example.edu',
    phone: '+263771111111',
    role: 'check-in',
    availability: 'weekday evenings',
    status: 'active',
  },
  {
    firstName: 'Jordan',
    lastName: 'Kim',
    email: 'jordan@example.edu',
    phone: '+12085550100',
    role: 'setup',
    availability: 'saturday mornings',
    status: 'pending',
  },
  {
    firstName: 'Ava',
    lastName: 'Martinez',
    email: 'ava@example.edu',
    phone: '+12085550101',
    role: 'cleanup',
    availability: 'friday afternoons',
    status: 'active',
  },
];

const registrations = [
  {
    eventTitle: 'Career Prep Workshop',
    attendeeName: 'Lebo Sebata',
    attendeeEmail: 'lebo@example.edu',
    ticketType: 'student',
    checkedIn: false,
    registeredAt: '2026-09-20T10:00:00.000Z',
  },
  {
    eventTitle: 'Service Saturday',
    attendeeName: 'Nora Peterson',
    attendeeEmail: 'nora@example.edu',
    ticketType: 'volunteer',
    checkedIn: true,
    registeredAt: '2026-09-21T11:30:00.000Z',
  },
  {
    eventTitle: 'Web Services Study Night',
    attendeeName: 'Kai Williams',
    attendeeEmail: 'kai@example.edu',
    ticketType: 'guest',
    checkedIn: false,
    registeredAt: '2026-09-22T08:45:00.000Z',
  },
];

const announcements = [
  {
    title: 'Registration Opens',
    message: 'Students can now register for October campus events.',
    audience: 'students',
    publishDate: '2026-09-25T12:00:00.000Z',
    expiresAt: '2026-10-15T12:00:00.000Z',
    isPinned: true,
    authorEmail: 'events@example.edu',
  },
  {
    title: 'Volunteer Reminder',
    message: 'Please arrive fifteen minutes before your assigned shift.',
    audience: 'volunteers',
    publishDate: '2026-09-26T12:00:00.000Z',
    expiresAt: '2026-10-20T12:00:00.000Z',
    isPinned: false,
    authorEmail: 'service@example.edu',
  },
  {
    title: 'Room Change',
    message: 'The Web Services Study Night moved to Library Room 204.',
    audience: 'all',
    publishDate: '2026-09-27T12:00:00.000Z',
    expiresAt: '2026-10-14T20:00:00.000Z',
    isPinned: true,
    authorEmail: 'cse341@example.edu',
  },
];

module.exports = {
  announcements,
  events,
  registrations,
  volunteers,
};
