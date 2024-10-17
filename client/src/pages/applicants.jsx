import { useEffect, useState } from 'react';
import React from 'react'
import { Link, useParams } from "react-router-dom";
import { apiRequest } from '../utils';

export default function Applicants() {
    const {id} = useParams();
    const [applicants, setApplicants] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchApplicant = async () => {
          try {
            const res = await apiRequest({
              url: `/applications/job/${id}`,
              method: "GET",
            });
            setApplicants(res);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchApplicant();
      }, [id]);

      const handleRowClick = (app) => {
        setSelectedApp(app);
      };
    
      const updateApplicationStatus = async (applicationId, newStatus) => {
        if (window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) {
          setIsLoading(true);
          try {
            const res = await apiRequest({
              url: `/applications/${applicationId}`,
              method: "PATCH",
              data: { status: newStatus },
            });

            console.log(res);
            // Update the applicants state with the new status
            setApplicants(prevApplicants => 
              prevApplicants.map(app => 
                app._id === applicationId ? {...app, status: newStatus} : app
              )
            );
            // Update the selected application if it's the one being changed
            if (selectedApp && selectedApp._id === applicationId) {
              setSelectedApp(prev => ({...prev, status: newStatus}));
            }
            setMessage({ type: 'success', text: `Application status updated to ${newStatus}` });
          } catch (error) {
            console.error("Error updating application status:", error);
            setMessage({ type: 'error', text: 'Error updating application status' });
          } finally {
            setIsLoading(false);
          }
        }
      };

      console.log(applicants);

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h1 className="text-2xl font-bold mb-6">Your Applications</h1>
      {message && (
        <div className={`p-4 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applicants?.map((app) => (
              <tr key={app._id} onClick={() => handleRowClick(app)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{app.user.firstName + " " + app.user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.user.email}</td>
                              <td className={`px-6 py-4 whitespace-nowrap ${
                                app.status === 'accepted' ? 'text-green-600' :
                                app.status === 'pending' ? 'text-yellow-600' :
                                app.status === 'rejected' ? 'text-red-600' : ''
                              }`}>
                                {app.status}
                              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white flex flex-col justify-between  p-8 rounded-lg shadow-xl max-w-[900px] w-full h-[500px]">
            <div>
            <div className='w-full flex items-center justify-between'>
            <p className="mb-2"><span className="font-semibold">User Name:</span> {selectedApp.user.firstName + " " + selectedApp.user.lastName}</p>
            <p className="mb-2"><span className="font-semibold">Status:</span> {selectedApp.status}</p>
            <button 
              onClick={() => updateApplicationStatus(selectedApp._id, 'accepted')} 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Approved'}
            </button>
            <button 
              onClick={() => updateApplicationStatus(selectedApp._id, 'rejected')} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Rejected'}
            </button>
            {selectedApp.status === 'accepted' && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book interview</button>
            )}
            </div>

            <h2 className='text-xl mb-2 font-bold'>Cover Letter</h2>
            <p className="mb-4 text-gray-700 pl-2 text-sm">{selectedApp.coverLetter}</p>
            </div>
            <div>
            <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mb-4 block">View Resume</a>
            <button onClick={() => setSelectedApp(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
