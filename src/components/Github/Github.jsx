import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
  const data = useLoaderData();

  return (
    <>
      <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
        Github followers: {data.followers}
        <img src={data.avatar_url} alt="Git picture" width={300} />
      </div>
      <div className='text-center m-4 bg-gray-600 text-white p-4 text-l'>
        <h2 className='text-white p-4 text-xl'>Repositories:</h2>
        <ul>
          {data.repositories.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const username = "redhatavinash";

export default Github;

export const githubInfoLoader = async () => {
  // Fetch user data
  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  const userData = await userResponse.json();

  // Fetch user repositories
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
  const reposData = await reposResponse.json();

  // Combine user data and repositories
  const combinedData = {
    ...userData,
    repositories: reposData,
  };

  return combinedData;
};
