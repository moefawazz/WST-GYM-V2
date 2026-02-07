import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Waveform } from "@uiball/loaders";
import Icons from "../../assets/icons/Icons";

const TableAddClient = () => {
  
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const docRef = collection(db, "Clients");
        const snapshot = await getDocs(docRef);
        let clientData = [];

        snapshot.forEach((doc) => {
          if (doc.exists()) {
            const specificDocument = doc.data();

            specificDocument.id = doc.id;
            clientData.push(specificDocument);
            console.log(specificDocument);
          }
        });

        setClients(clientData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

const calculateTimeLeft = (endDate) => {
  if (!endDate) return "N/A";

  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const end = endDate.toDate();

  const diffDays = Math.floor((end - today) / oneDay);

  if (diffDays >= 0) {
    return `${diffDays} days`;
  }

  return `Expired since ${end.toLocaleDateString()}`;
};


  const getCircleColor = (timeLeft) => {
    if (typeof timeLeft === "string") {
      const daysLeft = parseInt(timeLeft.split(" ")[0]);

      if (!isNaN(daysLeft)) {
        if (daysLeft > 10) {
          return "bg-green-500";
        } else if (daysLeft <= 10 && daysLeft > 0) {
          return "bg-yellow-500";
        }
      }
    }

    return "bg-orange";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
  const currentRecords = filteredClients.slice(indexOfFirstRecord, indexOfLastRecord);

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
    <div className="mx-[1.5rem]">
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
          <tr className=" text-[0.7rem]">
            <th>Clients</th>
            
            <th>Phone Number</th>
            <th>Time left</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-[0.7rem]">
                <div className="flex justify-center items-center">
                    <Waveform size={25} color="#f99f3d" />
                </div>
              </td>
            </tr>
          ) : currentRecords.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-[0.7rem]">
                No Records Found
              </td>
            </tr>
          ) : (
            currentRecords.map((item, index) => (
              <tr key={index} className="text-[0.7rem]">
                <td
                  onClick={() => {
                    navigate(`/profile/${item.id}`);
                    scrollToTop();
                  }}
                  className="cursor-pointer"
                >
                  {item.Name} {item.LastName}
                </td>
                
                <td>{item.PhoneNumber}</td>
                <td>
                  <div className="flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full inline-block mr-2 ${getCircleColor(
                        calculateTimeLeft(item.EndDate)
                      )}`}
                    ></span>
                    <span className="flex items-center">
                      {calculateTimeLeft(item.EndDate)}
                    </span>
                  </div>
                </td>
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
                <Icons.Left/>
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  if (index + 1 >= startPage && index + 1 <= endPage) {
    return (
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
    );
  }

  // Add a condition to render ellipsis (...) when not in the range
  

  return null;
})}
            <li>
              <button
                className="px-2 py-2 border border-orange rounded-full bg-orange text-white"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Icons.Right/>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableAddClient;
