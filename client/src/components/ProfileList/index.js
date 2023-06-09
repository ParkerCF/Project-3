import React from "react";
import { Link } from "react-router-dom";

// importing the ProfileList component
const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>There are no profiles available!</h3>;
  }

  // returning the ProfileList component to the "home" page
  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white" style={{ fontSize: "1rem" }}>
                    currently has{" "}
                    {profile.products ? profile.products.length : 0} items for
                    sale
                    {profile.products && profile.products.length === 1
                      ? ""
                      : "s"}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View and purchase the products below.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
