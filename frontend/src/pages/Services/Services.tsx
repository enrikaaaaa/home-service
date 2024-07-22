import { useEffect, useState } from "react";

import React from "react";
import ServicesCard from "../../components/business/servicesCard/ServicesCard";
import { fetchBusinesses } from "../../components/business/api";
import styles from "./Services.module.scss";

interface Service {
  _id: string;
  img: string;
  company: string;
  name: string;
  lastName: string;
  address: string;
  category: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchBusinesses();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <div className={styles.ServicesCards}>
        {services.map((service) => (
          <ServicesCard
            key={service._id}
            img={service.img}
            company={service.company}
            name={service.name}
            lastName={service.lastName}
            address={service.address}
            category={service.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
