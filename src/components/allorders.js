import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Allorder() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://swadapp.onrender.com/allorder")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <div className="text-center my-5 ">
        <h1> All Orders </h1>
      </div>
      <table className="table table-striped ">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">
              <h3>Name</h3>
            </th>
            <th scope="col">
              <h3>Email</h3>
            </th>
            <th scope="col">
              <h3>Address</h3>
            </th>
            <th scope="col">
              <h3>Orders</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr className="">
              <th scope="row">{post.name}</th>
              <th scope="row">{post.email}</th>
              <th scope="row">{post.address}</th>
              <th scope="row">{post.order}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allorder;
