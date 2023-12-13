import React from "react";

const TodayClients = () => {
  // Array of client objects
  const clients = [
    {
      Name: "John",
      LastName: "Doe",
      Type: "gym",
      PhoneNumber: "123-456-7890",
    },
    {
      Name: "Jane",
      LastName: "Smith",
      Type: "gym",
      PhoneNumber: "987-654-3210",
    },
    {
      Name: "Alice",
      LastName: "Johnson",
      Type: "gym",
      PhoneNumber: "555-123-4567",
    },
    {
      Name: "Bob",
      LastName: "Williams",
      Type: "gym",
      PhoneNumber: "111-222-3333",
    },
    // Add more clients if needed
  ];

  return (
    <div className="m-[1.5rem]">
<table className="dash-table">
        <thead>
          <tr className=" text-[0.7rem]">
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
            ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default TodayClients;
