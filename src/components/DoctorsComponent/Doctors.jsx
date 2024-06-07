import React from 'react';
import { susanne, Stephan } from '../imagepath';
import styles from './Doctors.module.scss';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';

const doctors = [
  {
    img: susanne,
    name: "Dr. med. Susanne Nusser",
    speciality: "Kinderärztin",
    details: [
      "Studium der Humanmedizin an der Universität Ulm",
      "Facharztweiterbildung in der Kinderklinik Göppingen sowie an der Universitätskinderklinik Ulm",
    ],
    additionalQualifications: [
      "Neugeborenennotarzt",
      "Zertifikat zur Durchführung Kinder- und Jugendgynäkologischer Sprechstunden"
    ],
    currentPositions: [
      "Oberärztin an der Kinderklinik Göppingen",
      "Mutter einer Tochter"
    ]
  },
  {
    img: Stephan,
    name: "Dr. med. Stephan Schwarz",
    speciality: "Kinderarzt",
    details: [
      "Studium der Humanmedizin an der Universität Ulm",
      "Facharztweiterbildung an der Universitätskinderklinik Ulm"
    ],
    additionalQualifications: [
      "Neugeborenennotarzt",
      "Ultraschallqualifikation DEGUM I",
      "In Weiterbildung Kinderkardiologie"
    ],
    currentPositions: [
      "niedergelassener Kinderarzt in einer Kinderarztpraxis in Günzburg, aktuell in Schwerpunktweiterbildung Kinderkardiologie und angeborene Herzfehler",
      "Vater von zwei Söhnen"
    ]
  }
];

const Doctors = () => {
  return (
    <>
      <div className={styles.doctors}>
        <div className={styles.container}>
          <SectionHeading 
            title='Über Uns' 
            subTitle='Geleitet werden die Seminare von Susanne Nusser und Stephan Schwarz, beide Fachärzte für Kinder- und Jugendmedizin mit mehrjähriger Klinikerfahrung, die aber beide auch die Elternperspektive gut kennen.'
          />
          <Spacing md="72" lg="50" />

          <div className={styles.wrapper}>
            {doctors.map((doctor, index) => (
              <div className={styles.card} key={index}>
                <img src={doctor.img} alt={doctor.name} />
                <div className={styles.info}>
                  <h3 className={styles.cardTitle}>{doctor.name}</h3>
                  <h5 className={styles.speciality}>{doctor.speciality}</h5>
                  <ul className={styles.detailsList} style={{ textAlign: 'left'}} >
                    {doctor.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                    <br />
                    <h5>Zusatzqualifikationen</h5>
                    {doctor.additionalQualifications.map((qualification, i) => (
                      <li style={{ textAlign: 'left', listStyleType: 'disc',marginLeft:"2.3rem" }} key={i}>{qualification}</li>
                    ))}
                  </ul>
                  <ul className={styles.currentPositions} style={{ textAlign: 'left'}}>
                    <h5>Aktuell</h5>
                    {doctor.currentPositions.map((position, i) => (
                      <li style={{ textAlign: 'left', listStyleType: 'disc',marginLeft:"2.3rem" }} key={i}>{position}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
