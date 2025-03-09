import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/users/Timmydrax`);
        if (!response.ok) {
          throw new Error(`HTTP Error! status ${response.status}`);
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return loading ? (
    <p>Hang tight! Coding magic in progress...</p>
  ) : error ? (
    <p> Error: {error.message} </p>
  ) : !userInfo ? null : (
    <div className="user-info">
      <h2 className="user-info-title">
        {userInfo.name} || {userInfo.login}
      </h2>
      <img
        src={userInfo.avatar_url}
        alt={`${userInfo.login}'s avatar`}
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <p>Username: {userInfo.login}</p>
      {/* Best approach incase Bio is empty, Nothing will be rendered */}
      {userInfo.bio && <p>Bio: {userInfo.bio}</p>}
      {userInfo.location && <p>Location: {userInfo.location}</p>}
      <p>Followers: {userInfo.followers} </p>
      <p>Following: {userInfo.following} </p>
      <p>Public Repositories: {userInfo.public_repos}</p>
      <a href={userInfo.html_url} target="_blank" rel="noopenner noreferrer">
        View on Github
      </a>
    </div>
  );
};

export default UserProfile;
