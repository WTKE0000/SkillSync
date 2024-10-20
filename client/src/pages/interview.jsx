import { useState, useEffect } from 'react'
import React from 'react'
import { apiRequest } from '../utils';

export default function Interview() {
  const [interviews, setInterviews] = useState([])


  const [selectedApp, setSelectedApp] = useState(null);
  

  useEffect(() => {
    const fetchInterviews = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      console.log(user?._id)
      try {
        const res = await apiRequest({
          url: `/interviews/company/${user?._id}`,
          method: "GET",
        });

        setInterviews(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterviews();
  }, []);


  const handleRowClick = (app) => {
    setSelectedApp(app);
  };


  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h1 className='md:text-3xl font-bold text-slate-700'>Interviews</h1>

      <div className="overflow-x-auto mt-5">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>


            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

          {interviews?.map((app) => (
              <tr key={app._id} onClick={() => handleRowClick(app)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{app.applicant?.firstName + " " + app.applicant?.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.job?.jobTitle}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {app.interviewDate}
                              </td>
                <td className="px-6 py-4 whitespace-nowrap">
                                {app.interviewTime}
                              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white flex flex-col justify-between  p-8 rounded-lg shadow-xl max-w-[400px] w-full h-[200px]">
            <div>
            <div className='w-full flex items-center justify-between'>
            <p className="mb-2"><span className="font-semibold">User Name:</span> {selectedApp.applicant?.firstName + " " + selectedApp.applicant?.lastName}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {selectedApp.applicant?.email}</p>
            </div>

            </div>
            <div>
            <p className='flex  justify-between items-center'>
              <a href={`${selectedApp.interviewLink}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Start Meeting
                </a>
            </p>
            <button onClick={() => setSelectedApp(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
        
    </div>
  )
}
