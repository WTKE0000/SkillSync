import { useEffect, useState } from "react";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";

const ApplicationStatus = () => {
  const { user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiRequest({
          url: `/applications/user/${user?._id}`,
          method: "GET",
        });

        console.log(res)

        setApplications(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, [user]);

  const handleRowClick = (app) => {
    setSelectedApp(app);
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h1 className="text-2xl font-bold mb-6">Your Applications</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications?.map((app) => (
              <tr key={app._id} onClick={() => handleRowClick(app)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{app.job.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.job.company.name}</td>
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
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedApp.jobTitle}</h2>
            <p className="mb-2"><span className="font-semibold">Company:</span> {selectedApp.job.company.name}</p>
            <p className="mb-2"><span className="font-semibold">Status:</span> {selectedApp.status}</p>
            <p className="mb-4"><span className="font-semibold">Cover Letter:</span> {selectedApp.coverLetter}</p>
            <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mb-4 block">View Resume</a>
            <button onClick={() => setSelectedApp(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;