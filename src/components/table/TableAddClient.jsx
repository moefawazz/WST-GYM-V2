import React from 'react'

const TableAddClient = ({data}) => {
    const getCircleColor = (timeLeft) => {
        let circleColor = '';
        const daysLeft = parseInt(timeLeft.split(' ')[0]);
    
        if (daysLeft > 10) {
          circleColor = 'bg-green-500';
        } else if (daysLeft <= 10 && daysLeft > 0) {
          circleColor = 'bg-yellow-500';
        } else {
          circleColor = 'bg-red';
        }
    
        return circleColor;
      };
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <table className="w-full rounded-[1rem] overflow-hidden">
        <thead>
          <tr className="text-black  border border-red">
            <th className="py-2 px-4  border border-red">Clients</th>
            <th className="py-2 px-4  border border-red">Type (Zumba or Gym)</th>
            <th className="py-2 px-4  border border-red">Phone Number</th>
            <th className="py-2 px-4  border border-red">Time left</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-200'}>
              <td className="py-2 px-4  border border-red">{item.firstName} {item.lastName}</td>
              <td className="py-2 px-4  border border-red">{item.activity}</td>
              <td className="py-2 px-4  border border-red">{item.phoneNumber}</td>
              <td className="py-2 px-4  border border-red">
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full inline-block mr-2 ${getCircleColor(item.timeLeft)}`}></span>
                  <span className="flex items-center">{item.timeLeft}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableAddClient