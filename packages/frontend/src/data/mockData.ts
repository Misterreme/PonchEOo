// Mock data for static application
export const mockEmployees = [
  {
    id: 1,
    employeeCode: 'EMP001',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@poncheo.com',
    role: 'SUPERVISOR',
    department: 'Engineering',
    hireDate: '2020-01-15',
    hourlyRate: 500,
    status: 'ACTIVE',
  },
  {
    id: 2,
    employeeCode: 'EMP002',
    firstName: 'Carlos',
    lastName: 'García',
    email: 'carlos@poncheo.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    hireDate: '2021-03-20',
    hourlyRate: 350,
    status: 'ACTIVE',
  },
  {
    id: 3,
    employeeCode: 'EMP003',
    firstName: 'María',
    lastName: 'López',
    email: 'maria@poncheo.com',
    role: 'EMPLOYEE',
    department: 'Marketing',
    hireDate: '2021-06-10',
    hourlyRate: 320,
    status: 'ACTIVE',
  },
  {
    id: 4,
    employeeCode: 'EMP004',
    firstName: 'Juan',
    lastName: 'Rodríguez',
    email: 'juan@poncheo.com',
    role: 'EMPLOYEE',
    department: 'Sales',
    hireDate: '2022-01-05',
    hourlyRate: 300,
    status: 'ACTIVE',
  },
];

export const mockPunches = [
  {
    id: 1,
    employeeId: 1,
    date: new Date().toISOString(),
    clockInTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    clockOutTime: null,
    status: 'OPEN',
  },
  {
    id: 2,
    employeeId: 2,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    clockInTime: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    clockOutTime: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
    status: 'CLOSED',
  },
  {
    id: 3,
    employeeId: 2,
    date: new Date().toISOString(),
    clockInTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    clockOutTime: null,
    status: 'OPEN',
  },
];

export const mockDashboardSupervisor = {
  openPunches: 2,
  pendingCorrections: 3,
  todayAbsences: 1,
  upcomingHolidays: 2,
};

export const mockDashboardEmployee = {
  todayStatus: 'CLOCKED_IN',
  hoursWorked: 5.5,
  totalHoursWeek: 22.3,
  pendingCorrections: 1,
};

export const mockPayroll = [
  {
    id: 1,
    employeeId: 1,
    firstName: 'Demo',
    lastName: 'User',
    period: '2026-02-01',
    hoursWorked: 160,
    hourlyRate: 500,
    grossSalary: 80000,
    deductions: 12000,
    netSalary: 68000,
    status: 'PAID',
  },
  {
    id: 2,
    employeeId: 2,
    firstName: 'Carlos',
    lastName: 'García',
    period: '2026-02-01',
    hoursWorked: 158,
    hourlyRate: 350,
    grossSalary: 55300,
    deductions: 8295,
    netSalary: 47005,
    status: 'PAID',
  },
  {
    id: 3,
    employeeId: 3,
    firstName: 'María',
    lastName: 'López',
    period: '2026-02-01',
    hoursWorked: 160,
    hourlyRate: 320,
    grossSalary: 51200,
    deductions: 7680,
    netSalary: 43520,
    status: 'PENDING',
  },
];

export const mockHolidays = [
  {
    id: 1,
    name: 'Año Nuevo',
    date: '2026-01-01',
    type: 'NATIONAL',
  },
  {
    id: 2,
    name: 'Carnaval',
    date: '2026-02-17',
    type: 'NATIONAL',
  },
  {
    id: 3,
    name: 'Viernes Santo',
    date: '2026-04-10',
    type: 'NATIONAL',
  },
  {
    id: 4,
    name: 'Vacaciones Pendientes',
    date: '2026-06-15',
    type: 'PERSONAL',
    employeeId: 1,
  },
];

export const mockCorrections = [
  {
    id: 1,
    employeeId: 2,
    firstName: 'Carlos',
    lastName: 'García',
    date: '2026-02-10',
    type: 'PUNCH_ADJUSTMENT',
    description: 'Ajuste de entrada - Olvide marcar',
    status: 'PENDING',
    requestedAt: '2026-02-12',
  },
  {
    id: 2,
    employeeId: 3,
    firstName: 'María',
    lastName: 'López',
    date: '2026-02-09',
    type: 'PUNCH_ADJUSTMENT',
    description: 'Error en hora de salida',
    status: 'APPROVED',
    requestedAt: '2026-02-11',
    approvedAt: '2026-02-13',
  },
];

export const mockShifts = [
  {
    id: 1,
    name: 'Matutino',
    startTime: '08:00',
    endTime: '16:00',
    description: 'Turno de mañana',
  },
  {
    id: 2,
    name: 'Vespertino',
    startTime: '12:00',
    endTime: '20:00',
    description: 'Turno de tarde',
  },
  {
    id: 3,
    name: 'Nocturno',
    startTime: '20:00',
    endTime: '04:00',
    description: 'Turno de noche',
  },
];

export const mockAuditLog = [
  {
    id: 1,
    action: 'CREATE_EMPLOYEE',
    user: 'Admin',
    target: 'EMP004 - Juan Rodríguez',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    changes: 'Nuevo empleado creado',
  },
  {
    id: 2,
    action: 'UPDATE_PUNCH',
    user: 'Demo User',
    target: 'Carlos García - 2026-02-10',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    changes: 'Reloj entrada modificado',
  },
  {
    id: 3,
    action: 'APPROVE_CORRECTION',
    user: 'Demo User',
    target: 'Corrección #2',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    changes: 'Corrección aprobada',
  },
  {
    id: 4,
    action: 'DELETE_EMPLOYEE',
    user: 'Admin',
    target: 'EMP005 - Test User',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    changes: 'Empleado eliminado',
  },
];
