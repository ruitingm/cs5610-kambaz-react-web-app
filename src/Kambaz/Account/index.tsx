import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
export default function Account() {
  return (
    <div id="wd-account-screen">
      <div>
        <div className="d-flex">
          <div className="d-none d-md-block">
            <AccountNavigation />
          </div>
          <div className="flex-fill ms-3">
            <Routes>
              <Route path="/" element={<Navigate to="Signin" />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
