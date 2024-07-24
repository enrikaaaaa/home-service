export default interface Appointment {
  id: string | null | undefined;
  title: string;
  userId: string;
  date: string;
  time: string;
  business: {
    company: string;
    address: string;
  };
}
export default interface Business {
  _id: string;
  company: string;
  name: string;
  lastName: string;
  address: string;
  category: string;
  img: string;
}
