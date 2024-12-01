import React, { useState, useEffect } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
              query: 'developer jobs in chicago',
              page: '3',
              num_pages: '3',
              country: 'us',
              date_posted: 'all'
            },
            headers: {
              'x-rapidapi-key': '73bcc2c20dmsh27a3e6a28707be9p1abd5fjsn3e6ce6e670fb',
              'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
          };

      try {
        const response = await axios.request(options);
        setJobs(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Search bar */}
      <div className="search-bar flex items-center justify-between bg-gray-900 p-4 rounded-md mb-6">
        <input
          type="text"
          placeholder="Search Job Title"
          className="bg-gray-800 text-white p-2 rounded-md w-1/4"
        />
        <input
          type="text"
          placeholder="Search Company"
          className="bg-gray-800 text-white p-2 rounded-md w-1/4"
        />
        <input
          type="text"
          placeholder="Search Location"
          className="bg-gray-800 text-white p-2 rounded-md w-1/4"
        />
        <select className="bg-gray-800 text-white p-2 rounded-md w-1/6">
          <option value="all">Date Posted</option>
          <option value="last24hours">Last 24 hours</option>
          <option value="last3days">Last 3 days</option>
          <option value="last7days">Last 7 days</option>
        </select>
      </div>

      {/* Job Listings */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">Job Listings</h1>
        {jobs.length === 0 ? (
          <div>No jobs found</div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li
                key={index}
                className="p-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
              >
                <h2 className="text-lg font-semibold text-white">{job.job_title}</h2>
                <p className="text-gray-400">{job.employer_name}</p>
                <p className="text-gray-400">{job.location}</p>
                <p className="text-sm text-gray-500">
                  Posted on: {new Date(job.date_posted).toDateString()}
                </p>
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobList;
