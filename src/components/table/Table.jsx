import React from 'react';

const Table = ({ data }) => {
  const getCircleColor = (timeLeft) => {
    let circleColor = '';
    const daysLeft = parseInt(timeLeft.split(' ')[0]); // Extract days as integer

    if (daysLeft > 10) {
      circleColor = 'bg-green-500'; // Green circle for more than 10 days
    } else if (daysLeft <= 10 && daysLeft > 0) {
      circleColor = 'bg-yellow-500'; // Yellow circle for 10 days or less
    } else {
      circleColor = 'bg-red-500'; // Red circle for 0 days or negative
    }

    return circleColor;
  };

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
              <td className="py-2 px-4 border-collapse border border-red rounded-lg overflow-hidden">
                <div className="flex items-center justify-center">
                  <span className={`w-4 h-4 rounded-full inline-block mr-2 ${getCircleColor(item.timeLeft)}`}></span>
                  {item.timeLeft}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
