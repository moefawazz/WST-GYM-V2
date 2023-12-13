import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import Icons from '../../assets/icons/Icons';
import TableProfits from './TableProfits';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase';

const ProfitsPage = () => {
  const [profits, setProfits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // Options: 'all', 'perMonth', 'perDay', 'perYear'
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const fetchProfitsData = async () => {
    try {
      const profitsCollectionRef = collection(db, 'Profits');
      const profitsSnapshot = await getDocs(profitsCollectionRef);
      const profitsData = profitsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfits(profitsData);
    } catch (error) {
      console.error('Error fetching profits data:', error);
    }
  };

  useEffect(() => {
    fetchProfitsData();
  }, []);

  const filteredProfits = profits.filter((profit) => {
    const startDate = new Date(profit.startDate.seconds * 1000);
    const startDateString = startDate.toISOString().split('T')[0];

    switch (filterOption) {
      case 'perMonth':
        return startDateString.includes(searchTerm);
      case 'perDay':
        return startDateString.includes(searchTerm);
      case 'perYear':
        return startDateString.includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto mt-4">
      <div >
      
       

      
        </div>
        <div className="my-[2rem]">
          <TableProfits  />
        </div>
     
    </div>
  );
};

export default ProfitsPage;
