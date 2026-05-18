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
}

export interface SupportStaff {
  id: number;
  name: string;
  role: string;
  type: string;
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
    credentials: 'MD, MS',
    title: 'Associate Professor · Chief, Division of Multiple Myeloma · Director, Amyloidosis Program',
    specialty: 'AL Amyloidosis · TTR Amyloidosis · Multiple Myeloma · Venetoclax',
    type: 'Hematologist-Oncologist',
    photo: '',
    bio: 'Dr. Michael Rosenzweig is an Associate Professor in the Department of Hematology and Hematopoietic Cell Transplantation at City of Hope, where he also serves as Chief of the Division of Multiple Myeloma and Director of the Amyloidosis Program. He joined City of Hope in 2011 after a fellowship in bone marrow transplantation at Memorial Sloan Kettering Cancer Center and earlier training at Boston University\'s Amyloid Treatment and Research Program. Dr. Rosenzweig has a clinical focus on all forms of amyloidosis — including light chain (AL), transthyretin (TTR), secondary amyloidosis (AA), and LECT2 — and works closely with a multidisciplinary team spanning cardiology, nephrology, and neurology. His research interests include finding new treatments for amyloidosis at various stages of the disease process, and he actively participates in clinical trials exploring novel therapies. He is a member of the American Society of Hematology, the American Society for Clinical Oncologists, and the International Society of Amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Second-line options for relapsed/refractory disease',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/michael-rosenzweig',
  },
  {
    id: 2,
    name: 'Dr. Lisa Lee',
    credentials: 'MD',
    title: 'Associate Clinical Professor · Department of Hematology & HCT',
    specialty: 'AL Amyloidosis · Multiple Myeloma · CAR-T Cell Therapy · HCT',
    type: 'Hematologist-Oncologist',
    photo: '',
    bio: 'Dr. Lisa Lee is an Associate Clinical Professor in the Department of Hematology and Hematopoietic Cell Transplantation at City of Hope Orange County, where she specialises in amyloidosis, complex multiple myeloma, and plasma cell disorders. She came to City of Hope from UC Irvine, where she spent seven years on faculty. Dr. Lee was a recipient of the Amyloidosis Foundation Young Investigator\'s Award in 2017 and has published extensively on AL amyloidosis, CAR-T therapy, and precision medicine approaches to plasma cell disease. She is particularly excited by advancements in understanding how the immune system can be harnessed to fight cancer, and her research includes work on the SAVE trial and pathways toward earlier AL amyloidosis diagnosis. She speaks Mandarin fluently.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: SAVE trial and earlier diagnosis of AL amyloidosis',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/lisa-lee',
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    credentials: 'MD',
    title: 'Assistant Clinical Professor · Division of Multiple Myeloma · Dept of Hematology & HCT',
    specialty: 'AL Amyloidosis · Multiple Myeloma · Bispecific Antibodies · CAR-T',
    type: 'Hematologist-Oncologist',
    photo: '',
    bio: 'Dr. Sarah Lee is an Assistant Clinical Professor in the Division of Multiple Myeloma at City of Hope, specialising in plasma cell disorders including myeloma and amyloidosis. She joined City of Hope in 2023 after serving on faculty at Fred Hutchinson Cancer Research Center. By that time she had co-authored 12 peer-reviewed publications and served as site principal investigator for seven active clinical trials. Dr. Lee is an active listener who guides patients in navigating the challenges of treatment, empowering them to make informed decisions. Her clinical focus includes second-line treatment approaches for relapsed/refractory AL amyloidosis, with particular expertise in bispecific antibody therapies. She has earned honours including a Merit Award from the American Society for Clinical Oncology\'s Conquer Cancer Foundation.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Bispecific antibodies for AL amyloidosis',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/sarah-lee',
  },
  {
    id: 4,
    name: 'Dr. Faizi Jamal',
    credentials: 'MD',
    title: 'Chief, Division of Cardiology · Director, Echocardiography Laboratory · Associate Clinical Professor',
    specialty: 'Cardiac Amyloidosis · Cardiac Imaging · AI Diagnostics · Cardio-Oncology',
    type: 'Cardiologist',
    photo: '',
    bio: 'Dr. Faizi Jamal is Chief of the Division of Cardiology and Director of the Echocardiography Laboratory at City of Hope, where he is an Associate Clinical Professor in the Department of Medicine. Board certified in cardiovascular disease, adult comprehensive echocardiography, nuclear cardiology, and cardio-oncology, Dr. Jamal specialises in cardiac amyloidosis and the cardiovascular complications of cancer therapies. Before joining City of Hope he spent five years at Northwestern University Feinberg School of Medicine. His research focuses on earlier detection of cardiotoxicity and on applying artificial intelligence algorithms to measure cardiac function — work with direct implications for improving the diagnosis of cardiac amyloidosis at an earlier, more treatable stage. He has co-published with Dr. Rosenzweig on amyloidosis with cardiac involvement and holds a co-investigator award from Pfizer for optimising the identification and management of ATTR amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: AI tools for cardiac amyloidosis diagnosis',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/faizi-jamal',
  },
  {
    id: 5,
    name: 'Dr. Tibor Kovacsovics',
    credentials: 'MD',
    title: 'Professor · Department of Hematology & Hematopoietic Cell Transplantation',
    specialty: 'AL Amyloidosis · Autologous SCT · AML · ALL · Stem Cell Transplantation',
    type: 'Hematologist-Oncologist',
    photo: '',
    bio: 'Dr. Tibor Kovacsovics is a Professor in the Department of Hematology and Hematopoietic Cell Transplantation at City of Hope, bringing 20 years of clinical research experience in hematologic malignancies and amyloidosis. He co-founded the Utah Amyloidosis Program at the University of Utah/Huntsman Cancer Institute, where he served as Medical Director of the Inpatient Hematologic Malignancies/Transplant Unit and Co-Director of the Acute Leukemia Program. Dr. Kovacsovics trained in hematology-oncology at Harvard Medical School/Brigham and Women\'s Hospital/Massachusetts General Hospital and earned his medical degree from the University of Geneva. He has served as principal or co-investigator on dozens of clinical studies and is a member of the American Society of Hematology and the International Society of Amyloidosis. His July session will cover the evolving role of upfront autologous stem cell transplantation in primary AL amyloidosis, from historical context to current best practice.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Upfront autologous SCT for primary AL amyloidosis',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/tibor-kovacsovics',
  },
];

// Support staff from Dr. Rosenzweig's April 20 email to the COH Amyloid team
export const supportStaff: SupportStaff[] = [
  { id: 1, name: 'Eve Celestial', role: 'Multi-disciplinary Amyloid Clinic RN', type: 'Registered Nurse' },
  { id: 2, name: 'Tricia Walker', role: 'Amyloidosis NP', type: 'Nurse Practitioner' },
  { id: 3, name: 'Justine Buchholz', role: 'Amyloidosis NP', type: 'Nurse Practitioner' },
  { id: 4, name: 'Edelyn Yhip', role: 'Nurse Navigator, Amyloid Clinic', type: 'Nurse Navigator' },
  { id: 5, name: 'Gloria Higuera', role: 'Senior Site Liaison, Patient Scheduling', type: 'Site Liaison' },
  { id: 6, name: 'Stephanie Goral', role: 'Clinical Research Nurse, Amyloid Trials', type: 'Clinical Research Nurse' },
  { id: 7, name: 'James Sanchez', role: 'Staff Scientist, Clinical & Translational Research', type: 'Staff Scientist' },
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
