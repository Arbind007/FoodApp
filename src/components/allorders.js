import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOktaAuth } from '@okta/okta-react';
import NotAuthorized from "./NotAuthorized";

function Allorder({ allowedGroup }) {
  const [posts, setPosts] = useState([]);
  const { authState } = useOktaAuth();
  const isAuthenticated = authState && authState.isAuthenticated;
  var userGroups = null;
  var cnt = 0;
  if (isAuthenticated) {
    userGroups = authState && authState.idToken.claims.department;
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://swadapp.onrender.com/allorder");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated && userGroups && userGroups.includes(allowedGroup)) {
      fetchPosts();
    }
  }, [isAuthenticated, userGroups, allowedGroup]);

  if (isAuthenticated && userGroups && userGroups.includes(allowedGroup)) {
    return (
      <div>
        <div className="text-center my-5">
          <h1>All Orders</h1>
        </div>
        <table className="table table-striped">
          <thead className="bg-dark text-white">
            <tr key="header">
              <th scope="col"><h3>Name</h3></th>
              <th scope="col"><h3>Email</h3></th>
              <th scope="col"><h3>Address</h3></th>
              <th scope="col"><h3>Orders</h3></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={cnt = cnt + 1}>
                <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', width: '20%' }}>
                  {post.name}
                </td>
                <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', width: '20%' }}>
                  {post.email}
                </td>
                <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', width: '30%' }}>
                  {post.address}
                </td>
                <td style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', width: '30%' }}>
                  {post.order}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (!isAuthenticated) {
    return <div>Please login to view the content</div>;
  } else {
    return <NotAuthorized />;
  }
}

export default Allorder;
