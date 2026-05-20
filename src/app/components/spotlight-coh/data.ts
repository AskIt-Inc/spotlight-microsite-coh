export interface Clinician {
  id: number;
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  type: string;
  photo: string;
  bio: string;
  hasVideo: boolean;
  hasSession: boolean;
  sessionLabel: string;
  appointmentUrl: string;
  videoUrl?: string;
  appointmentLabel?: string;
}

export interface SupportStaff {
  id: number;
  name: string;
  credentials: string;
  role: string;
  note?: string;
}

export interface Trial {
  id: string;
  title: string;
  status: string;
  description: string;
  phase: string;
}

export interface Session {
  id: number;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  presenter: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const CITY_OF_HOPE_URL = 'https://www.cityofhope.org/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Michael Rosenzweig',
    credentials: 'MD',
    title: 'Chief, Division of Multiple Myeloma · Director, COH Amyloidosis Program',
    specialty: 'Multiple Myeloma · Amyloidosis · Plasma Cell Disorders · Hematology',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/96842f25-1673-4f19-afc8-38c46b9d9560/default/rosenzweig-michael.jpg',
    bio: 'Dr. Michael Rosenzweig is Chief of the Division of Multiple Myeloma and Director of the Amyloidosis Program at City of Hope. A hematologist-oncologist with expertise in plasma cell disorders, he cares for patients with multiple myeloma, Waldenström macroglobulinemia, POEMS syndrome, and all forms of amyloidosis — AL, TTR, AA, and LECT2. He trained at Boston Medical Center and Memorial Sloan Kettering, and previously directed the Amyloid Treatment and Research Program at Boston University.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Second-line options for relapsed/refractory disease — the COH experience with venetoclax for AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Rosenzweig',
  },
  {
    id: 2,
    name: 'Dr. Lisa Lee',
    credentials: 'MD',
    title: 'Associate Clinical Professor, Hematology & Hematopoietic Cell Transplantation',
    specialty: 'Multiple Myeloma · Amyloidosis · CAR T-cell Therapy · Precision Medicine',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/0197c300-3d40-7313-b2ec-5995c543f3b7/default/lee-lisa.jpg',
    bio: 'Dr. Lisa Lee is a hematologist and Associate Clinical Professor at City of Hope Orange County (Irvine), specialising in multiple myeloma, amyloidosis, smoldering myeloma, and CAR T-cell therapy. She trained at Tufts Medical Center and was previously on faculty at UC Irvine, where she received the Amyloidosis Foundation Young Investigator\'s Award. She is the principal investigator of the SAVE trial — a study working toward earlier diagnosis of AL amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: SAVE trial — towards earlier diagnosis of AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Lisa Lee',
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    credentials: 'MD',
    title: 'Assistant Clinical Professor, Division of Multiple Myeloma · Hematology & HCT',
    specialty: 'Multiple Myeloma · Amyloidosis · Plasma Cell Disorders · Hematology & Oncology',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/b72e060e-711e-48f1-b5f9-db05221ef639/default/lee-sarah.jpg',
    bio: 'Dr. Sarah S. Lee is a hematologist-oncologist specialising in plasma cell disorders including multiple myeloma and amyloidosis. She joined City of Hope in 2023 after faculty appointments at Fred Hutchinson Cancer Research Center and Cleveland Clinic, where she was chief quality improvement fellow. By the time she arrived at City of Hope, she had co-authored 12 peer-reviewed publications and was principal investigator on seven active clinical trials.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Second-line treatment options — the COH experience with bispecific antibodies for AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Sarah Lee',
  },
  {
    id: 4,
    name: 'Dr. Faizi Jamal',
    credentials: 'MD',
    title: 'Chief, Division of Cardiology · Director, Echocardiography Laboratory',
    specialty: 'Cardiac Amyloidosis · Cardiac Imaging · Heart Failure · Cardio-Oncology',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/30513842-8963-49eb-a578-1b77dc885b54/default/jamal-faizi.jpg',
    bio: 'Dr. Faizi Jamal is a cardiologist and Chief of the Division of Cardiology at City of Hope, where he also directs the Echocardiography Laboratory. He specialises in cardio-oncology, cardiac imaging, heart failure, and cardiac amyloidosis, and is board-certified in cardiovascular disease, echocardiography, and nuclear cardiology. He trained at Cedars-Sinai and previously held faculty at Northwestern University Feinberg School of Medicine.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: AI tools for the diagnosis of cardiac amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Jamal',
  },
  {
    id: 5,
    name: 'Dr. Tibor Kovacsovics',
    credentials: 'MD',
    title: 'Chief of Hematology · Medical Director of Leukemia, COH Phoenix',
    specialty: 'Acute Leukemia · Stem Cell Transplantation · Amyloidosis · AML · ALL',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/85764fed-a462-4167-9984-c30499b3c790/default/kovacsovics-tibor.jpg',
    bio: 'Dr. Tibor Kovacsovics is Chief of Hematology and Medical Director of Leukemia at City of Hope Cancer Center Phoenix. A hematologist-oncologist with 20 years of clinical research experience, he specialises in AML, ALL, stem cell transplantation, and amyloidosis. He trained at Harvard Medical School/MGH/Brigham and Women\'s, co-founded the Utah Amyloidosis Program at Huntsman Cancer Institute, and has served as principal investigator on dozens of landmark hematology studies.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: The role of upfront autologous SCT for primary AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Kovacsovics',
  },
];

export const supportStaff: SupportStaff[] = [
  {
    id: 1,
    name: 'Eve Celestial',
    credentials: 'RN',
    role: 'Multi-disciplinary Amyloid Clinic Registered Nurse',
  },
  {
    id: 2,
    name: 'Tricia Walker',
    credentials: 'NP',
    role: 'Amyloidosis Nurse Practitioner',
    note: 'Expertise in Smoldering Multiple Myeloma, Relapsed/Refractory Multiple Myeloma, Myeloproliferative Neoplasms, and Febrile Neutropenia.',
  },
  {
    id: 3,
    name: 'Justine Buchholz',
    credentials: 'NP',
    role: 'Amyloidosis Nurse Practitioner',
    note: 'Family nurse practitioner in advanced practice nursing with a certification in family care.',
  },
  {
    id: 4,
    name: 'Edelyn Whip',
    credentials: '',
    role: 'Nurse Navigator, Amyloid Clinic',
  },
  {
    id: 5,
    name: 'Gloria Higuera',
    credentials: '',
    role: 'Senior Site Liaison for Patient Scheduling',
  },
  {
    id: 6,
    name: 'Stephanie Goral',
    credentials: 'RN',
    role: 'Clinical Research Nurse for Amyloid Trials',
  },
  {
    id: 7,
    name: 'James Sanchez',
    credentials: 'PhD',
    role: 'Staff Scientist, Clinical & Translational Research',
    note: 'Leading research initiatives in healthcare delivery through scientific project development within City of Hope.',
  },
];

export const trials: Trial[] = [];

export const sessions: Session[] = [
  {
    id: 1,
    month: 'JUL',
    day: '1',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'Second-line options for relapsed/refractory disease: the COH experience with venetoclax for AL amyloidosis',
    presenter: 'Dr. Michael Rosenzweig',
    description: 'Dr. Rosenzweig will discuss his approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with venetoclax.',
    status: 'upcoming',
  },
  {
    id: 2,
    month: 'JUL',
    day: '8',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'SAVE trial: towards earlier diagnosis of AL amyloidosis',
    presenter: 'Dr. Lisa Lee',
    description: 'Dr. Lisa Lee will review the SAVE trial and how results could possibly lead to an earlier diagnosis of AL amyloidosis.',
    status: 'upcoming',
  },
  {
    id: 3,
    month: 'JUL',
    day: '15',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'Second-line treatment options: the COH experience with bispecific antibodies for AL amyloidosis',
    presenter: 'Dr. Sarah Lee',
    description: 'Dr. Sarah Lee will discuss her approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with bispecific antibodies.',
    status: 'upcoming',
  },
  {
    id: 4,
    month: 'JUL',
    day: '22',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'AI tools for the diagnosis of cardiac amyloidosis',
    presenter: 'Dr. Faizi Jamal',
    description: 'Dr. Jamal will discuss the current and evolving AI tools for the diagnosis of cardiac amyloidosis.',
    status: 'upcoming',
  },
  {
    id: 5,
    month: 'JUL',
    day: '29',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'The role of upfront autologous SCT for primary AL amyloidosis',
    presenter: 'Dr. Tibor Kovacsovics',
    description: 'Dr. Kovacsovics will discuss autologous SCT for the treatment of AL amyloidosis: past, present, and future, including how first-line treatment has evolved and where upfront AutoSCT is considered.',
    status: 'upcoming',
  },
];
