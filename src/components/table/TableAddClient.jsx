import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

const TableAddClient = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const docRef = collection(db, 'Clients');
        const snapshot = await getDocs(docRef);
        let clientData = [];

        snapshot.forEach((doc) => {
          if (doc.exists()) {
            const specificDocument = doc.data();
            clientData.push(specificDocument);
          }
        });

        setClients(clientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, []);

  const calculateTimeLeft = (endDate) => {
    if (endDate) {
      const oneDay = 24 * 60 * 60 * 1000; 
      const currentDate = new Date();
      const endDateObj = endDate.toDate(); 
      const timeDifference = endDateObj - currentDate;
      const daysDifference = Math.floor(timeDifference / oneDay);

      return daysDifference >= 0 ? `${daysDifference} days` : 'Expired';
    }

    return 'N/A';
  };

  const getCircleColor = (timeLeft) => {
    if (typeof timeLeft === 'string') {
      const daysLeft = parseInt(timeLeft.split(' ')[0]);

      if (!isNaN(daysLeft)) {
        if (daysLeft > 10) {
          return 'bg-green-500';
        } else if (daysLeft <= 10 && daysLeft > 0) {
          return 'bg-yellow-500';
        }
      }
    }
    
    return 'bg-red'; 
  };

  return (
    <div className="mx-[1.5rem]">
      <table className="dash-table">
        <thead>
          <tr className=" text-[0.7rem]">
            <th>Clients</th>
            <th>Activity</th>
            <th>Phone Number</th>
            <th>Time left</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black text-[0.7rem]' : 'bg-gray-200 text-[0.7rem]'}>
              <td>{item.Name} {item.LastName}</td>
              <td>{item.Type}</td>
              <td>{item.PhoneNumber}</td>
              <td>
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full inline-block mr-2 ${getCircleColor(calculateTimeLeft(item.EndDate))}`}></span>
                  <span className="flex items-center">{calculateTimeLeft(item.EndDate)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAddClient;
