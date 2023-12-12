import React,{useEffect,useState} from 'react'
import Cards from "../../components/card/Cards";
import Icons from "../../assets/icons/Icons";
import {  collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
const StatCard = () => {


  const [clientsCount, setClientsCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

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
    fetchTotalPayments();
    fetchClientsCount();
  }, []);


  return (
    <div className="px-[1.5rem] py-[2.5rem] flex flex-col gap-[2rem] justify-center items-center flex-wrap">
    <h1 className="text-[1.7rem]">Performance Overview</h1>
    <div className="flex flex-1 gap-[2rem] flex-wrap">
      <Cards text="Clients" count={clientsCount} icon={<Icons.Users/>}/>
      <Cards text="Payments" count={totalPayments}  icon={<Icons.Credit/>}/>
    </div>
    <div className="flex flex-1 gap-[2rem] flex-wrap">
      <Cards text="Profits" count="300" icon={<Icons.Dollar/>}/>
      <Cards text="Today Clients" count="10" icon={<Icons.Today/>}/>
    </div>
  </div>
  )
}

export default StatCard