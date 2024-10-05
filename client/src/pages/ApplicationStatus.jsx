import { useEffect, useState } from "react";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";

const ApplicationStatus = () => {
  const { user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiRequest({
          url: `/applications/user/${user._id}`,
          method: "GET",
        });
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div>
      <h1>Your Applications</h1>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>Job Title: {app.jobTitle}</p>
            <p>Status: {app.status}</p>
            <p>Cover Letter: {app.coverLetter}</p>
            <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationStatus;