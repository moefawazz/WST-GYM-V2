import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';

const TodayClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsCollection = collection(db, 'Clients');
        const querySnapshot = await getDocs(clientsCollection);

        const currentDate = new Date().toISOString().split('T')[0];
        const filteredClients = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((client) => client.LastCame === currentDate);

        setClients(filteredClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="m-[1.5rem]">
      <table className="dash-table">
        <thead>
          <tr className="text-[0.7rem]">
            <th className="px-1.5">#</th>
            <th>Clients</th>
            <th>Activity</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((item, index) => (
            <tr key={index} className="text-[0.7rem]">
              <td>{index + 1}</td>
              <td>{item.Name} {item.LastName}</td>
              <td>{item.Type}</td>
              <td>{item.PhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayClients;
