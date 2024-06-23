import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '../../services/dbService'; // Import Firestore service
import styles from './Doctors.module.scss';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import { FaHandPointer } from 'react-icons/fa'; // Import the hand pointer icon

const Doctors = ({title,subtitle}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = await getAllDocuments('Doctors');
        const doctorsData = doctorsCollection.docs.map(doc => doc.data());
        setDoctors(doctorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors data: ", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleTap = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.doctors}>
        <div className={styles.container}>
          <SectionHeading 
            title={title} 
            subTitle={subtitle}
          />
          <Spacing md="72" lg="50" />

          <div className={styles.wrapper}>
            {doctors.map((doctor, index) => (
              <div 
                className={`${styles.card} ${expandedIndex === index ? styles.expanded : ''}`} 
                key={index}
                onClick={() => handleTap(index)}
              >
                <img src={doctor.image} alt={doctor.name} />
                <div className={styles.cardHeader}>
                  <FaHandPointer className={styles.handIcon} />
                </div>
                <div style={{ padding: '9px' }} className={`${styles.info} ${expandedIndex === index ? styles.expanded : ''}`}>
                  <h3 className={styles.cardTitle}>{doctor.name}</h3>
                  <h5 className={styles.speciality}>{doctor.occupation}</h5>
                  <ul className={styles.detailsList} style={{ textAlign: 'left', marginLeft: "1rem" }}>
                    {doctor.introduction?.map((detail, i) => (
                      <li style={{ textAlign: 'left', listStyleType: 'disc', marginLeft: "1rem" }} key={i}>{detail}</li>
                    ))}
                      <h5 style={{marginTop: "1rem"}}>Zusatzqualifikationen</h5>
                    {doctor.zusatzqualifikationen?.map((qualification, i) => (
                      <li style={{ textAlign: 'left', listStyleType: 'disc', marginLeft: "1rem" }} key={i}>{qualification}</li>
                    ))}
                  </ul>
                  <ul className={styles.currentPositions} style={{ textAlign: 'left', marginLeft: "1rem" }}>
                    <h5>Aktuell</h5>
                    {doctor.aktuell?.map((position, i) => (
                      <li style={{ textAlign: 'left', listStyleType: 'disc', marginLeft: "1rem" }} key={i}>{position}</li>
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
