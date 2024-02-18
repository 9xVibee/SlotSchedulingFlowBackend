export type AdminType = {
    name: string;
    email: string;
    password: string;
    role: string | undefined,
}

export type PhysioType = {
    name: string;
    email: string;
    password: string;
    role: string | undefined,
}

export type PatientType = {
    name: string;
    email: string;
    password: string;
    role: string | undefined,
}

export type SlotsType = {
    createdBy: string;
    remark: string;
      weekStart: string; 
      weekEnd: string;
      date: string;
      day: string;
      isAllocated: boolean;
      slotStartTime: string;
      slotEndTime: string;
      save: () => Promise<Document>
}