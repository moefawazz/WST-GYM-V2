import React, { useEffect, useState } from 'react';
import Cards from '../../components/card/Cards';
import Icons from '../../assets/icons/Icons';
import { collection, getDocs, where, query, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const StatCard = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [todayClientsCount, setTodayClientsCount] = useState(0);
const navigate=useNavigate()
  useEffect(() => {
    const fetchClientsCount = async () => {
      try {
        const clientsCollection = collection(db, 'Clients');
        const querySnapshot = await getDocs(clientsCollection);
        setClientsCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchTotalPayments = async () => {
      try {
        const paymentsCollection = collection(db, 'Payments');
        const querySnapshot = await getDocs(paymentsCollection);

        let total = 0;
        querySnapshot.forEach((doc) => {
          const { totalPrice } = doc.data();
          total += parseFloat(totalPrice, 2);
        });

        setTotalPayments(total);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    const fetchTodayClientsCount = async () => {
      try {
        const clientsCollection = collection(db, 'Clients');
        const currentDate = new Date().toISOString().split('T')[0]; 
        const q = query(
          clientsCollection,
          where('LastCame', '>=', currentDate),
          where('LastCame', '<=', currentDate)
        );

        const querySnapshot = await getDocs(q);
        setTodayClientsCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching today\'s clients:', error);
      }
    };

    fetchClientsCount();
    fetchTotalPayments();
    fetchTodayClientsCount();
  }, []);

  return (
    <div className="px-[1.5rem] py-[2.5rem] flex flex-col gap-[2rem] justify-center items-center flex-wrap pt-[5.5rem]">
      <h1 className="text-[1.7rem]">Performance Overview</h1>
      <div className="flex flex-1 gap-[2rem] flex-wrap">
     <Link to={"/Client"} className='w-full'>  <Cards text="Clients"  count={clientsCount} icon={<Icons.Users />} /></Link> 
       <Link to={"/clientsToday"} className='w-full'><Cards text="Today Clients" count={todayClientsCount} icon={<Icons.Today />} /></Link> 
      </div>
      <div className="flex flex-1 gap-[2rem] flex-wrap">
       <Link to={"/Profits"} className='w-full'><Cards text="Profits" count="Check your Profits" icon={<Icons.Dollar />} /></Link> 
       <Link to={"/Payments"} className='w-full'><Cards text="Payments" count="Check your Payments" icon={<Icons.Credit />} /></Link> 
      </div>
    </div>
  );
};

export default StatCard;
