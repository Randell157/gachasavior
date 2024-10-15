import Link from "next/link";
import React from "react";

const motFound = () => {
  return (
    <div>
      <h2>404: Page not found</h2>
      <p>Could not find requested page</p>
      <Link className="" href="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default motFound;
