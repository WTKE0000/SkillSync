import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user || user.accountType !== "admin") {
      navigate("/");
    } 
  }, [user, navigate]);

  useEffect(() => {

  const fetchUsers = async () => {
    try {
      const res = await apiRequest({
        url: `/users/all-users`,
        method: "GET",
      });
      setUsers(res.users);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUsers();
}, []);

useEffect(() => {
const fetchJobs = async () => {
  try {
    const res = await apiRequest({
      url: `/jobs/all-jobs`,
      method: "GET",
    });
    setJobs(res.users);
  } catch (error) {
    console.error(error);
  }
};

fetchJobs();
}, []);

useEffect(() => {
  const fetchApplicants = async () => {
    try {
      const res = await apiRequest({
        url: `/applications/getAllApplications`,
        method: "GET",
      });
      setApplicants(res);
    } catch (error) {
      console.error(error);
    }
  };
  
  fetchApplicants();
  }, []);

 useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await apiRequest({
          url: `/companies/getAllCompanies`,
          method: "GET",
        });
        setCompanies(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
    }, []);
  
  
    const handleRowClick = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    };
  
    // Function to handle user deletion (just a mock)
    const deleteUser = async () => {
      console.log('Deleting user:', selectedUser);
      try {
        const res = await apiRequest({
          url: `/users/delete-user/${selectedUser._id}`,
          method: "DELETE",
        });

        if (res.success) {
          alert(res.message);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }

      setSelectedUser(null);
      setShowModal(false);
    };

  return (
    <div className="p-6 bg-gray-100 min-h-screen container mx-auto mt-10 px-4 mb-10">
    {/* Top Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Total Earning */}
      <div className="bg-purple-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-purple-700">No Users</p>
        <h2 className="text-3xl font-bold">{users.length}</h2>
        <p className="text-gray-500"></p>
      </div>
      {/* Average Earning */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-blue-700">No Jobs</p>
        <h2 className="text-3xl font-bold">{jobs.length}</h2>
        <p className="text-gray-500"></p>
      </div>
      {/* Conversion Rate */}
      <div className="bg-green-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-green-700">No  applications</p>
        <h2 className="text-3xl font-bold">{applicants.length}</h2>
        <p className="text-gray-500"></p>
      </div>
      <div className="bg-blue-200 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-green-700">No companies</p>
        <h2 className="text-3xl font-bold">{companies.length}</h2>
        <p className="text-gray-500"></p>
      </div>
    </div>

    {/* Regular Sell Section */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User List</h3>
        </div>
        {/* User Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Contact</th>
              <th className="py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(user)}
              >
                <td className="py-2">{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Jobs Table */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Jobs Available</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="py-2">Job Title</th>
                <th className="py-2">Job Type</th>
                <th className="py-2">Location</th>
                <th className="py-2">Salary</th>
                <th className="py-2">Vacancies</th>
                <th className="py-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{job.jobTitle}</td>
                  <td>{job.jobType}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.vacancies}</td>
                  <td>{job.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Jobs Table */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Applicants</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Job Title</th>
                <th className="py-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{applicant.user?.firstName} {applicant.user?.lastName}</td>
                  <td>{applicant.job?.jobTitle}</td>
                  <td>{applicant.job?.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  
    {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p>Are you sure you want to delete {selectedUser.name}?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteUser}
              >
                Delete
              </button>
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
};

export default AdminPage;