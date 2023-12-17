import React, { useEffect, useState } from 'react';
import Icons from '../../assets/icons/Icons';
import PopUpDelete from '../popUp/PopUpDelete';
import { Waveform } from '@uiball/loaders';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';

const TodayClients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {

  }

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter((item) => {
    const fullName = `${item.Name} ${item.LastName}`;
    const phoneNumber = item.PhoneNumber.toString();

    // Check for selected category
    const categoryMatch =
      selectedCategory === "All" || item.Type === selectedCategory;

    // Check for search term match
    const searchMatch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm);

    return categoryMatch && searchMatch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredClients.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredClients.length / recordsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="m-[1.5rem]">
      <div className="w-full flex justify-end gap-[8px]">
        <div className="w-[50%]">
          <select
            className="w-full border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] bg-white outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Zumba">Zumba</option>
            <option value="Gym">Gym</option>
          </select>
        </div>
        <input
          type="search"
          className="w-[50%] border border-orange rounded-[0.25rem] text-[0.7rem] px-[0.5rem] py-[0.3rem] outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
        {loading ? (
            <tr>
              <td colSpan="5" className="text-[0.7rem]">
                <div className="flex justify-center items-center">
                  <Waveform size={25} color="#f99f3d" />
                </div>
              </td>
            </tr>
          ) : currentRecords.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-[0.7rem]">
                No Records Found
              </td>
            </tr>
          ) : (
          currentRecords.map((item, index) => (
            <tr key={index} className="text-[0.7rem]">
              <td>{index + 1}</td>
              <td>{item.Name} {item.LastName}</td>
              <td>{item.Type}</td>
              <td>{item.PhoneNumber}</td>
            </tr>
             ))
             )}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 text-[0.8rem]">
        <nav>
          <ul className="pagination flex">
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <Icons.Left />
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  className={`${
                    currentPage === index + 1
                      ? "bg-orange text-white"
                      : "bg-white text-orange"
                  } px-2 py-1 border border-orange rounded-full`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Icons.Right />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex justify-center items-center'>
        <button className={`rounded-[3.125rem] bg-red-600 px-[1.5rem] py-[0.43rem] text-white`} onClick={() => setIsModalOpen(true)}>Clear All</button>
      </div>
      <PopUpDelete
            isOpen={isModalOpen}
            title="Clear All"
            text="Are you sure you want to clear all?"
            confirmText="Delete"
            bgColor="bg-red-600"
            onCancel={closeDeleteModal}
            onConfirm={handleDelete}
          />
    </div>
  );
};

export default TodayClients;
