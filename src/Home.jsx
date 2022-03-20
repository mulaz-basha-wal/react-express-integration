import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='text-center text-light home-context'>
      <h1>Welcome to React - Express Integration</h1>
      <p>
        This project is designed to integrates both custom express API server
        and React application
        <br /> to communicate and exchange data through API requests.
      </p>
      <div className='d-flex flex-row justify-content-center'>
        <Link className='btn btn-primary m-2' to='/products'>
          Products
        </Link>
        <Link className='btn btn-success m-2' to='/forums'>
          Forums
        </Link>
      </div>
    </div>
  );
}
