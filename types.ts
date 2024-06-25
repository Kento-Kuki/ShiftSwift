import { Employee, Shift, ShiftAssignment, Site } from '@prisma/client';

export type Option = {
  value: string;
  label: string;
};

export type ShiftWithAssignments = Shift & {
  shiftAssignments: (ShiftAssignment & {
    employee: Employee;
  })[];
  site: Site & {
    client: {
      name: string;
    };
  };
};

export type EmployeeWithShifts = Employee & {
  shiftAssignments: {
    shift: Shift;
  }[];
};
