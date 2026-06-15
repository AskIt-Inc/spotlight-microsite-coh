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
  sessionDate: string;
  sessionTitle: string;
  sessionDescription: string;
  education?: string;
  appointmentUrl: string;
  videoUrl?: string;
  sessionUuid?: string;
  profileUid?: number;   // API uid — used to look up live photo from useSpotlightProfiles
}

export interface SupportStaff {
  id: number;
  name: string;
  credentials: string;
  role: string;
  email?: string;
  note?: string;
  photo?: string;
  profileUrl?: string;
  ctaLabel?: string;
  profileUid?: number;
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
  uuid?: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  presenter: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  regLink?: string;
  shortUrl?: string;
}

const CITY_OF_HOPE_URL = 'https://www.cityofhope.org/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Michael Rosenzweig',
    credentials: 'MD',
    title: 'Associate Professor, Hematology & HCT · Co-Director, COH Amyloidosis Program · Chief, Division of Multiple Myeloma',
    specialty: 'Hematology/Oncology · Amyloidosis · Myeloma · HCT',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/96842f25-1673-4f19-afc8-38c46b9d9560/default/rosenzweig-michael.jpg',
    bio: 'Dr. Michael Rosenzweig is an Associate Professor of Medicine, Department of Hematology & Hematopoietic Cell Transplantation. He is Co-Director of the City of Hope Amyloidosis Program and Chief of the Division of Multiple Myeloma. He is an expert in plasma cell disorders — multiple myeloma, Waldenström macroglobulinemia, POEMS syndrome, and all forms of amyloidosis (AL, TTR, AA, and LECT2). He trained at Boston Medical Center and Memorial Sloan Kettering, and previously worked with the Amyloid Treatment and Research Program.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'July 1',
    sessionTitle: 'Second-line options for relapsed/refractory disease: the COH experience with venetoclax for AL amyloidosis',
    sessionDescription: 'Dr. Rosenzweig will discuss his approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with venetoclax.',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/michael-rosenzweig',
    sessionUuid: 'b3baeab8-7544-4c5b-ad12-3f1576133569',
    profileUid: 295,
  },
  {
    id: 2,
    name: 'Dr. Lisa Lee',
    credentials: 'MD',
    title: 'Associate Clinical Professor, Hematology & Hematopoietic Cell Transplantation',
    specialty: 'Hematology/Oncology · Amyloidosis · Multiple Myeloma · Precision Medicine',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/0197c300-3d40-7313-b2ec-5995c543f3b7/default/lee-lisa.jpg',
    bio: 'Dr. Lisa Lee is a hematologist and Associate Clinical Professor at City of Hope Orange County (Irvine), specialising in multiple myeloma, amyloidosis, smoldering myeloma, and CAR T-cell therapy. She trained at Tufts Medical Center and was previously on faculty at UC Irvine, where she received the Amyloidosis Foundation Young Investigator\'s Award. She is the principal investigator of the SAVE trial — a study working toward earlier diagnosis of AL amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'July 8',
    sessionTitle: 'SAVE trial: towards earlier diagnosis of AL amyloidosis',
    sessionDescription: 'Dr. Lisa Lee will review the SAVE trial and how results could possibly lead to an earlier diagnosis of AL amyloidosis.',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/lisa-lee',
    sessionUuid: 'f6004c33-97e0-4fcd-95c5-1a94542c3cd1',
    profileUid: 277,
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    credentials: 'MD',
    title: 'Assistant Clinical Professor, Division of Multiple Myeloma · Hematology & HCT',
    specialty: 'Hematology/Oncology · Amyloidosis · Plasma Cell Disorders · Multiple Myeloma',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/b72e060e-711e-48f1-b5f9-db05221ef639/default/lee-sarah.jpg',
    bio: 'Dr. Sarah S. Lee is an Assistant Clinical Professor, Division of Multiple Myeloma/Hematology & HCT. She specializes in plasma cell disorders including multiple myeloma and amyloidosis. She joined City of Hope in 2023 after faculty appointments at Fred Hutchinson Cancer Research Center and Cleveland Clinic, where she was chief quality improvement fellow. By the time she arrived at City of Hope, she had co-authored 12 peer-reviewed publications and was principal investigator on seven active clinical trials.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'July 15',
    sessionTitle: 'Second-line treatment options: the COH experience with bispecific antibodies for AL amyloidosis',
    sessionDescription: 'Dr. Sarah Lee will discuss her approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with bispecific antibodies.',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/sarah-lee',
    sessionUuid: '1c49752f-1bde-400b-9499-4c14114097fa',
    profileUid: 279,
  },
  {
    id: 4,
    name: 'Dr. Faizi Jamal',
    credentials: 'MD',
    title: 'Associate Clinical Professor, Division of Cardiology, Department of Medicine · Co-Director, Amyloidosis Program · Chief, Division of Cardiology · Director, Echocardiography Laboratory',
    specialty: 'Cardiology · Amyloidosis · Heart Failure · Cardiac Imaging',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/30513842-8963-49eb-a578-1b77dc885b54/default/jamal-faizi.jpg',
    bio: 'Dr. Faizi Jamal is an Associate Clinical Professor, Division of Cardiology, and Chief of the Division of Cardiology at City of Hope, where he also directs the Echocardiography Laboratory. He specializes in cardio-oncology, cardiac imaging, heart failure, and cardiac amyloidosis, and is board-certified in cardiovascular disease, echocardiography, and nuclear cardiology. He trained at Cedars-Sinai and previously held faculty at Northwestern University Feinberg School of Medicine.',
    hasVideo: true,
    hasSession: true,
    sessionDate: 'July 22',
    sessionTitle: 'Diagnosis of Cardiac Amyloidosis',
    sessionDescription: 'Dr. Jamal will review the diagnostic features of cardiac amyloidosis, the red flags clinicians examine, and the steps followed to confirm disease. Within this diagnostic process, we will discuss the emergence of novel AI tools that may increase disease detection.',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/faizi-jamal',
    videoUrl: '/videos/jamal-coh-spotlight.mp4',
    sessionUuid: '4eb4381a-0a98-44c0-829a-f6e3cb131b6a',
    profileUid: 278,
  },
  {
    id: 5,
    name: 'Dr. Tibor Kovacsovics',
    credentials: 'MD',
    title: 'Professor, Department of Hematology & HCT · Chief of Hematology · Medical Director of Leukemia, COH Phoenix',
    specialty: 'Hematology/Oncology · Amyloidosis · Acute Leukemia · HCT',
    type: 'Medical Doctor',
    photo: 'https://cdn.cityofhope.org/media/bios/85764fed-a462-4167-9984-c30499b3c790/default/kovacsovics-tibor.jpg',
    bio: 'Dr. Tibor Kovacsovics is a Professor of Medicine, Department of Hematology and Hematopoietic Cell Transplantation. He is the Chief of Hematology and Medical Director of Leukemia at City of Hope Cancer Center Phoenix. He has 20 years of clinical research experience and specialises in AML, ALL, stem cell transplantation, and amyloidosis. He trained at Harvard Medical School/MGH/Brigham and Women\'s, co-founded the Utah Amyloidosis Program at Huntsman Cancer Institute, and has served as principal investigator on dozens of landmark hematology studies.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'July 29',
    sessionTitle: 'The role of upfront autologous SCT for primary AL amyloidosis',
    sessionDescription: 'Dr. Kovacsovics will discuss autologous SCT for the treatment of AL amyloidosis: past, present, and future, including how first-line treatment has evolved and where upfront AutoSCT is considered.',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/tibor-kovacsovics',
    sessionUuid: '3a73451c-0b71-4c31-8e42-f6370b2d6c16',
    profileUid: 296,
  },
  {
    id: 6,
    name: 'Dr. Hadi Mohammad Khanli',
    credentials: 'MD',
    title: 'Assistant Clinical Professor, Neurology',
    specialty: 'Neurology · Clinical Neurophysiology · Neuromuscular Disorders',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Hadi Mohammad Khanli is a neurologist at City of Hope with expertise in clinical neurophysiology, EMG, neuromuscular ultrasound, and complex neuromuscular diseases. He completed neurology training in Iran and the United States, conducted research at UCLA, completed neurology residency at George Washington University Hospital, and completed a Clinical Neurophysiology Fellowship at the National Institutes of Health. At City of Hope, he serves as Chief of the Neurophysiology Laboratory and focuses on neuromuscular disorders associated with hematologic malignancies, immunotherapy, and chemotherapy.',
    hasVideo: false,
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: 'https://www.cityofhope.org/patients/find-a-doctor/hadi-khanli',
    profileUid: 307,
  },
  {
    id: 7,
    name: 'Dr. Amna Rizvi',
    credentials: 'MD',
    title: 'Contracted Consultant',
    specialty: 'Nephrology · Internal Medicine',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Amna A. Rizvi is a nephrology specialist with California Kidney Specialists. She is board certified in Internal Medicine and Nephrology and practices at California Kidney Specialists locations including San Dimas, Pasadena, and Covina. She completed her internal medicine residency at Olive View Medical Center-UCLA and her nephrology fellowship at Harbor-UCLA Medical Center.',
    hasVideo: false,
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: 'https://californiakidneyspecialists.com/amna-a-rizvi-md/',
    profileUid: 308,
  },
];

export const supportStaff: SupportStaff[] = [
  {
    id: 1,
    name: 'Eve Marie Celestial',
    credentials: 'BSN, RN',
    role: 'Registered Nurse — Hematology / Amyloidosis Patient Education',
    email: 'emariecelestial@coh.org',
    note: 'Eve Marie Celestial is preparing a patient education session on taking control of health care through patient portals, including how patients can access records, communicate securely with providers, schedule appointments, and stay organized. The Monday session date is still pending.',
    profileUid: 306,
  },
  {
    id: 2,
    name: 'Tricia Walker',
    credentials: 'MSN, FNP-C',
    role: 'Nurse Practitioner — Hematology & HCT / Multiple Myeloma & Amyloidosis',
    email: 'trwalker@coh.org',
    note: 'Tricia R. Walker, MSN, FNP-C, is a nurse practitioner specializing in amyloidosis, multiple myeloma, and hematopoietic stem cell transplantation, with more than 10 years of experience across acute and outpatient care settings. She combines expertise in complex hematologic malignancies with patient advocacy, education, and compassionate care to support patients and families throughout treatment.',
    profileUid: 310,
  },
  {
    id: 3,
    name: 'Justine Buchholz',
    credentials: 'NP',
    role: 'Nurse Practitioner — Amyloidosis Care',
    email: 'jbuchholz@coh.org',
    note: 'Justine Buchholz supports amyloidosis care as a nurse practitioner, helping patients and families navigate clinical questions, care planning, and follow-up needs within the program.',
  },
  {
    id: 4,
    name: 'Edelyn Yhip',
    credentials: 'RN, BSN',
    role: 'Registered Nurse — Intake Nurse Navigation / Myeloma & Amyloidosis',
    email: 'eyhip@coh.org',
    note: 'Edelyn Yhip supports intake nurse navigation for leukemia, lymphoma, myeloma, amyloidosis, gene therapy, pediatrics, and Enterprise New Patient Services. She helps patients connect with the right care team and understand next steps as they enter the program.',
  },
  {
    id: 5,
    name: 'Gloria Higuera',
    credentials: '',
    role: 'Senior Site Liaison — Enterprise New Patient Services / Amyloidosis Program',
    email: 'glohiguera@coh.org',
    note: 'Gloria Higuera supports coordination between patients, new patient services, and the amyloidosis program so referrals and next steps are routed clearly.',
  },
  {
    id: 6,
    name: 'Stephanie Goral',
    credentials: 'RN',
    role: 'Registered Nurse — Clinical Research / Amyloid Trials',
    email: 'sgoral@coh.org',
    note: 'Stephanie Goral supports amyloid clinical trial activity as a clinical research nurse, helping patients and the care team with trial-related coordination and follow-up.',
  },
  {
    id: 7,
    name: 'James Sanchez',
    credentials: 'PhD',
    role: 'Project Development Scientist — Multiple Myeloma & Amyloidosis Research',
    email: 'jamsanchez@coh.org',
    note: 'James Sanchez, PhD, is a Senior Project Development Scientist in the Department of Clinical Translational Project Development at City of Hope. He works with the multiple myeloma and amyloidosis teams and supports the development of grant applications, clinical protocols, manuscripts, posters, and presentations.',
    profileUid: 309,
  },
];

export const trials: Trial[] = [
  {
    id: 'NCT06292780',
    title: 'Linvoseltamab in Adults With Relapsed or Refractory Systemic Light Chain Amyloidosis (LINKER-AL2)',
    status: 'Recruiting',
    description: 'Phase 1/2 study of linvoseltamab (an anti-BCMA bispecific antibody by Regeneron) in adults with AL amyloidosis that has returned or failed prior therapies. City of Hope (Duarte) is actively enrolling.',
    phase: 'Phase 1/2',
  },
  {
    id: 'NCT06022939',
    title: 'Dara-VCD Chemotherapy ± Stem Cell Transplant for Newly Diagnosed AL Amyloidosis',
    status: 'Recruiting',
    description: 'Phase 3 randomized trial (SWOG Cancer Research Network) comparing daratumumab + cyclophosphamide + bortezomib + dexamethasone (Dara-VCD) with or without autologous stem cell transplantation in newly diagnosed AL amyloidosis.',
    phase: 'Phase 3',
  },
  {
    id: 'NCT05652335',
    title: 'Study of JNJ-79635322 in Relapsed/Refractory Multiple Myeloma or Previously Treated AL Amyloidosis',
    status: 'Recruiting',
    description: 'Phase 1 first-in-human dose escalation study of JNJ-79635322, a novel trispecific antibody (Janssen), in participants with relapsed or refractory multiple myeloma or previously treated amyloid light-chain (AL) amyloidosis. City of Hope (Duarte) is an active site.',
    phase: 'Phase 1',
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    uuid: 'b3baeab8-7544-4c5b-ad12-3f1576133569',
    month: 'JUL',
    day: '1',
    dayOfWeek: 'Wed',
    time: '3:00 PM PT',
    title: 'Second-line options for relapsed/refractory disease: the COH experience with venetoclax for AL amyloidosis',
    presenter: 'Dr. Michael Rosenzweig',
    description: 'Dr. Rosenzweig will discuss his approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with venetoclax.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/LYroe9sxRm2CK6smUWbrFw',
    shortUrl: 'https://bit.ly/42Ny34w',
  },
  {
    id: 2,
    uuid: 'f6004c33-97e0-4fcd-95c5-1a94542c3cd1',
    month: 'JUL',
    day: '8',
    dayOfWeek: 'Wed',
    time: '3:00 PM PT',
    title: 'SAVE trial: towards earlier diagnosis of AL amyloidosis',
    presenter: 'Dr. Lisa Lee',
    description: 'Dr. Lisa Lee will review the SAVE trial and how results could possibly lead to an earlier diagnosis of AL amyloidosis.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/hRt1DaytTZK3lDJYh4e-0A',
    shortUrl: 'https://bit.ly/42KFIAv',
  },
  {
    id: 3,
    uuid: '1c49752f-1bde-400b-9499-4c14114097fa',
    month: 'JUL',
    day: '15',
    dayOfWeek: 'Wed',
    time: '3:00 PM PT',
    title: 'Second-line treatment options: the COH experience with bispecific antibodies for AL amyloidosis',
    presenter: 'Dr. Sarah Lee',
    description: 'Dr. Sarah Lee will discuss her approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with bispecific antibodies.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/covQZppvT-2xeiITJ6-rFg',
    shortUrl: 'https://bit.ly/42QVdH7',
  },
  {
    id: 4,
    uuid: '4eb4381a-0a98-44c0-829a-f6e3cb131b6a',
    month: 'JUL',
    day: '22',
    dayOfWeek: 'Wed',
    time: '3:00 PM PT',
    title: 'Diagnosis of Cardiac Amyloidosis',
    presenter: 'Dr. Faizi Jamal',
    description: 'Dr. Jamal will review the diagnostic features of cardiac amyloidosis, the red flags clinicians examine, and the steps followed to confirm disease. Within this diagnostic process, we will discuss the emergence of novel AI tools that may increase disease detection.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/8YLMvNWQQOCq6nWuWdDyHw',
    shortUrl: 'https://bit.ly/4fA5ZZK',
  },
  {
    id: 5,
    uuid: '3a73451c-0b71-4c31-8e42-f6370b2d6c16',
    month: 'JUL',
    day: '29',
    dayOfWeek: 'Wed',
    time: '3:00 PM PT',
    title: 'The role of upfront autologous SCT for primary AL amyloidosis',
    presenter: 'Dr. Tibor Kovacsovics',
    description: 'Dr. Kovacsovics will discuss autologous SCT for the treatment of AL amyloidosis: past, present, and future, including how first-line treatment has evolved and where upfront AutoSCT is considered.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/v8-wvczMROubSvL8KHw9NA',
    shortUrl: 'https://bit.ly/4v0eCkG',
  },
];
