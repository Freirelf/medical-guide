"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule) : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      case "create":
        status = "pending";
        break;
      default:
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date( values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);
        if(appointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date( values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if(updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }

    } catch (error) {
      console.log("error", error);
    }
  };

  let buttonLabel;
  
  switch (type) {
    case "create":
      buttonLabel = "Gerar Consulta";
      break;
    case "cancel":
      buttonLabel = "Cancelar Consulta";
      break;
    case "schedule":
      buttonLabel = "Agendar Consulta";
    default:
      break
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        { type === "create" &&  
          <section className="mb-12 space-y-4">
            <h1 className="header">Nova Consulta</h1>
            <p className="text-dark-700">
              Solicite um novo agendamento em 10 segundos
            </p>
          </section>
        }

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Médico(a)"
              placeholder="Selecione Médico(a)"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data"
              placeholder="Selecione a data para a consulta"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
              disabled
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Motivo"
                placeholder="Motivo da consulta"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notas"
                placeholder="Escreva suas notas"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Motivo do cancelamento"
            placeholder="Escreva o motivo do cancelamento"
          />
        )}

      <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}> {buttonLabel} </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
