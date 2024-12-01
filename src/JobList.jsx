import React, { useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState(""); 

  const fetchJobs = async () => {
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: jobTitle,
        page: "1",
        num_pages: "1",
        country: country,
      },
      headers: {
        "x-rapidapi-key": "73bcc2c20dmsh27a3e6a28707be9p1abd5fjsn3e6ce6e670fb",
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    setLoading(true);
    setError("");

    try {
      const response = await axios.request(options);
      setJobs(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="search-bar flex flex-wrap items-center justify-between bg-gray-900 p-4 rounded-md mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md w-full md:w-1/3"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md w-full md:w-1/4"
        >
          <option value="IN">India</option>
          <option value="US">United States</option>
          <option value="GB">England</option>
          <option value="AU">Australia</option>
        </select>
        <button
          onClick={fetchJobs}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md"
        >
          Search
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
        {loading ? (
          <div>Loading jobs...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : jobs.length === 0 ? (
          <div>No jobs found</div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li
                key={index}
                className="p-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
              >
                <h2 className="text-lg font-semibold">{job.job_title}</h2>
                <p className="text-gray-400">{job.employer_name}</p>
                <p className="text-gray-400">{job.job_location}</p>
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
