import React, { useState, useEffect } from 'react';

interface ContributionData {
  id: string;
  uploadedUserId: string;
  title: string;
  content: string;
  imageId: string;
  documentId: string;
  submissionPeriodId: string;
}

const UserComponent: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionData[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://2d81-1-53-97-124.ngrok-free.app/api/contribution', {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse JSON response

      console.log(data); // Handle response data
      setContributions(data);
    } catch (error) {
      console.error('Error fetching data:', error); // Handle errors
    }
  }

  return (
    <div className="p-12">
      <h1 className="font-black justify-center items-center">Contribution List</h1>
      <ul className="flex-">
        {contributions.map(contribution => (
          <li className="p-5" key={contribution.id}>
            <ol>{contribution.id}</ol>
            <ol>{contribution.uploadedUserId}</ol>
            <ol>{contribution.title}</ol>
            <ol>{contribution.content}</ol>
            <ol>{contribution.imageId}</ol>
            <ol>{contribution.documentId}</ol>
            <ol>{contribution.submissionPeriodId}</ol>
            <ol>--------------------------</ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;