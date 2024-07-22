import React from "react";
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About Us</h1>

      <section className={styles.story}>
        <h2>Our Story</h2>
        <p>
          Welcome to Logoipsum, where creativity meets innovation. Since our
          founding, we have been dedicated to providing top-notch logo design
          services that help businesses stand out. Our journey began with a
          small team of passionate designers who believed in the power of visual
          identity. Over the years, we have grown into a dynamic company,
          delivering exceptional design solutions to clients worldwide.
        </p>
      </section>

      <section className={styles.contact}>
        <h2>Contact Information</h2>
        <p>
          <strong>Address:</strong> 123 Logoipsum Street, Design City, 45678
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Email:</strong> contact@logoipsum.com
        </p>
      </section>

      <section className={styles.map}>
        <h2>Our Location</h2>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0860938655537!2d144.95373631531678!3d-37.8162189797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e1f0a433%3A0x3d0f1c3c5441e8cf!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614903999095!5m2!1sen!2sau"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default About;
