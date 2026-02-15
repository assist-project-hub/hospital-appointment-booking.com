import { Banner } from '../components/customer/Banner';
import { Departments } from '../components/customer/Departments';
import { Doctors } from '../components/customer/Doctors';
import { About } from '../components/customer/About';
import { Contact } from '../components/customer/Contact';
import { BookingForm } from '../components/customer/BookingForm';

export function CustomerHome() {
  return (
    <>
      <Banner />
      <Departments />
      <Doctors />
      <About />
      <BookingForm />
      <Contact />
    </>
  );
}
