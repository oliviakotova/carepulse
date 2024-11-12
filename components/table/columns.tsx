"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium ">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient;
      return (
        <p className="text-14-medium ">
          {patient && patient.name ? patient.name : "Unknown Patient"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      return (
        <p className="text-14-regular min-w-[100px]">
          {schedule
            ? formatDateTime(schedule).dateTime
            : "No Appointment Scheduled"}
        </p>
      );
    },
  },

  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctorName = row.original.primaryPhysician;
      const doctor = Doctors.find((doc) => doc.name === doctorName);

      return (
        <div className="flex items-center gap-3">
          {doctor ? (
            <>
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={100}
                height={100}
                className="size-8"
              />
              <p className="whitespace-nowrap">Dr. {doctor.name}</p>
            </>
          ) : (
            <p className="text-14-medium">Unknown Doctor</p>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      const patient = data.patient;
      const userId = data.userId;

      return (
        <div className="flex gap-1">
          {patient && patient.$id && userId ? (
            <>
              <AppointmentModal
                patientId={patient.$id}
                userId={userId}
                appointment={data}
                type="schedule"
              />
              <AppointmentModal
                patientId={patient.$id}
                userId={userId}
                appointment={data}
                type="cancel"
              />
            </>
          ) : (
            <p>No actions available</p>
          )}
        </div>
      );
    },
  },
];
