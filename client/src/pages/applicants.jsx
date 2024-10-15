import { useEffect, useState } from 'react';
import React from 'react'
import { Link, useParams } from "react-router-dom";
import { apiRequest } from '../utils';

export default function Applicants() {
    const {id} = useParams();
    const [applicants, setApplicants] = useState(null);

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

      console.log(applicants);

  return (
    <div>
     
    </div>
  )
}
