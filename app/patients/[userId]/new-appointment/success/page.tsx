import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointments } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import { get } from 'http';
import Image from 'next/image'
import Link from 'next/link'

const Success = async ({params: {userId}, searchParams }: SearchParamProps) => {
  const appointmentId = searchParams?.appointmentId as string || '';
  const appointment = await getAppointments(appointmentId)

  const doctor = Doctors.find(doctor => doctor.name === appointment?.primaryPhysician)

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className=" h-10 w-fit"
          />
        </Link>

        <section className="flex  flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={280}
            height={300}
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Sua <span className="text-green-500">solicitação de agendamento</span> foi
            enviada com sucesso!
          </h2>

          <p className="">Entraremos em contato em breve para confirmar o agendamento.</p>
        </section>

        <section className="request-details">
          <p>Detalhes da consulta solicitada:</p>
          <div className="flex items-center gap-3">
          {doctor?.image && (
            <Image
              src={doctor.image}
              alt="doctor"
              width={100}
              height={100}
              className="size-10"
            />
            )}
            <p className="whitespace-nowrap"> Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Nova Consulta
          </Link>
        </Button>

        <p className="copyright py-12">
          © 2024 Medical Guide
        </p>
      </div>
      
    </div>
  )
}

export default Success