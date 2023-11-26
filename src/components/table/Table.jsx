import React from 'react';

const Table = ({ data }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <table className="w-full rounded-[1rem]">
        <thead>
          <tr className="text-black border-collapse border border-red rounded-[1rem] overflow-hidden">
            <th className="py-2 px-4 border-collapse border border-red rounded-[1rem] overflow-hidden">Clients</th>
            <th className="py-2 px-4 border-collapse border border-red rounded-[1rem] overflow-hidden">Type (Zumba or Gym)</th>
            <th className="py-2 px-4 border-collapse border border-red rounded-[1rem] overflow-hidden">Time left</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-200'}>
              <td className="py-2 px-4 border-collapse border border-red rounded-lg overflow-hidden">{item.client}</td>
              <td className="py-2 px-4 border-collapse border border-red rounded-lg overflow-hidden">{item.type}</td>
              <td className="py-2 px-4 border-collapse border border-red rounded-lg overflow-hidden">{item.timeLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
