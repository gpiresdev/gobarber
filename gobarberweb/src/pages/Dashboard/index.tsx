import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import imgLogo from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={imgLogo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/49327163?s=460&u=2902c36aa87938ed12a5e7aaff48033ad1c4f886&v=4"
                alt="alt"
              />
              <strong>Fulano Silva</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49327163?s=460&u=2902c36aa87938ed12a5e7aaff48033ad1c4f886&v=4"
                  alt="MINHA FOTO PORRA"
                />
                <strong>Guilherme Pires</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49327163?s=460&u=2902c36aa87938ed12a5e7aaff48033ad1c4f886&v=4"
                  alt="MINHA FOTO PORRA"
                />
                <strong>Guilherme Pires</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49327163?s=460&u=2902c36aa87938ed12a5e7aaff48033ad1c4f886&v=4"
                  alt="MINHA FOTO PORRA"
                />
                <strong>Guilherme Pires</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/49327163?s=460&u=2902c36aa87938ed12a5e7aaff48033ad1c4f886&v=4"
                  alt="MINHA FOTO PORRA"
                />
                <strong>Guilherme Pires</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
