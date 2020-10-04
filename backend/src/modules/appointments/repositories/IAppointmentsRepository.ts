import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';

export default interface IAppointmentsRepository {
  findAllInMonth(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
}
