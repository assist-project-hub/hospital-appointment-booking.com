const KEYS = {
  departments: 'hospital_departments',
  doctors: 'hospital_doctors',
  appointments: 'hospital_appointments',
  contacts: 'hospital_contacts',
  settings: 'hospital_settings',
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const defaultSettings = {
  hospitalName: 'LuminaCare',
  tagline: 'Excellence in Healthcare',
  banner: {
    title: 'Your Health is Our Top Priority',
    subtitle: 'Experience world-class medical services with a touch of compassion. LuminaCare Hospital combines cutting-edge technology with the expertise of top medical professionals to ensure you get the best care possible.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000',
    ctaText: 'Book Your Visit',
  },
  about: {
    heading: 'We Are Committed To Your Better Health',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01592fd03cf7?auto=format&fit=crop&q=80&w=1000',
    stats: '25+',
    statsLabel: 'Years of Excellence',
    points: [
      { title: 'Modern Equipment', text: 'Our facility is equipped with the latest diagnostic and surgical technology.' },
      { title: 'Expert Medical Team', text: 'Our doctors are board-certified and leaders in their respective fields.' },
      { title: 'Patient-Centered Care', text: 'We believe in a holistic approach where patient comfort and safety come first.' },
    ],
    footerText: 'Dedicated to providing accessible, high-quality healthcare to our community through innovation, compassion, and clinical excellence.',
  },
  contact: {
    phone: '+1 (800) 999-0000',
    phoneLabel: 'Emergency Call',
    phoneSub: 'Available 24/7',
    email: 'support@luminacare.org',
    emailLabel: 'Email Us',
    emailSub: 'Typical reply: 2 hours',
    address: '123 Wellness Ave, NY',
    addressLabel: 'Our Location',
    addressSub: 'MedCity Central',
  },
};

const defaultDepartments = [
  { id: 'cardiology', name: 'Cardiology', description: 'Comprehensive heart care and cardiovascular surgery.', icon: 'Heart' },
  { id: 'neurology', name: 'Neurology', description: 'Specialized treatment for brain and nervous system disorders.', icon: 'Activity' },
  { id: 'pediatrics', name: 'Pediatrics', description: 'Dedicated healthcare for infants, children, and adolescents.', icon: 'Users' },
  { id: 'orthopedics', name: 'Orthopedics', description: 'Advanced care for bone, joint, and muscle conditions.', icon: 'ShieldCheck' },
  { id: 'dermatology', name: 'Dermatology', description: 'Expert solutions for skin, hair, and nail health.', icon: 'User' },
];

const defaultDoctors = [
  { id: 'doc-1', name: 'Dr. Sarah Mitchell', departmentId: 'cardiology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Senior Cardiologist with 15+ years of experience.', availability: 'Mon - Fri' },
  { id: 'doc-2', name: 'Dr. James Wilson', departmentId: 'cardiology', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Specialist in Interventional Cardiology.', availability: 'Tue - Sat' },
  { id: 'doc-3', name: 'Dr. Elena Rodriguez', departmentId: 'neurology', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Expert in neurodegenerative disorders.', availability: 'Mon - Wed' },
  { id: 'doc-4', name: 'Dr. Michael Chen', departmentId: 'pediatrics', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Compassionate pediatric care specialist.', availability: 'Mon - Fri' },
  { id: 'doc-5', name: 'Dr. Lisa Thompson', departmentId: 'orthopedics', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Leading orthopedic surgeon and sports medicine expert.', availability: 'Wed - Sun' },
  { id: 'doc-6', name: 'Dr. David Park', departmentId: 'dermatology', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300&h=300', bio: 'Cosmetic and clinical dermatologist.', availability: 'Mon - Thu' },
];

function seedIfEmpty() {
  if (localStorage.getItem(KEYS.departments) != null) return;
  safeSet(KEYS.departments, defaultDepartments);
  safeSet(KEYS.doctors, defaultDoctors);
  safeSet(KEYS.appointments, []);
  safeSet(KEYS.contacts, []);
  safeSet(KEYS.settings, defaultSettings);
}

export function getDepartments() {
  seedIfEmpty();
  return safeGet(KEYS.departments, []);
}

export function setDepartments(data) {
  return safeSet(KEYS.departments, data);
}

export function getDoctors() {
  seedIfEmpty();
  return safeGet(KEYS.doctors, []);
}

export function setDoctors(data) {
  return safeSet(KEYS.doctors, data);
}

export function getAppointments() {
  seedIfEmpty();
  return safeGet(KEYS.appointments, []);
}

export function addAppointment(appointment) {
  const list = getAppointments();
  const item = {
    id: crypto.randomUUID?.() ?? `apt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...appointment,
  };
  list.unshift(item);
  return safeSet(KEYS.appointments, list) ? item : null;
}

export function getContacts() {
  seedIfEmpty();
  return safeGet(KEYS.contacts, []);
}

export function addContact(contact) {
  const list = getContacts();
  const item = {
    id: crypto.randomUUID?.() ?? `cnt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...contact,
  };
  list.unshift(item);
  return safeSet(KEYS.contacts, list) ? item : null;
}

export function getSettings() {
  seedIfEmpty();
  const stored = safeGet(KEYS.settings, null);
  if (!stored) return defaultSettings;
  return { ...defaultSettings, ...stored };
}

export function setSettings(data) {
  const current = getSettings();
  return safeSet(KEYS.settings, { ...current, ...data });
}
