import { useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router";
export default function PazzaNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links =
    currentUser.role === "FACULTY"
      ? [
          { path: "QandA", label: "Q & A" },
          { path: "Resources", label: "Resources" },
          { path: "Statistics", label: "Statistics" },
          { path: "ManageClass", label: "Manage Class" },
        ]
      : [
          { path: "QandA", label: "Q & A" },
          { path: "Resources", label: "Resources" },
          { path: "Statistics", label: "Statistics" },
        ];
  return (
    <div
      id="wd-pazza-navigation"
      className="d-flex  wd-pazza-bg-blue wd-pazza-nav-bar align-content-center"
    >
      <div
        id="wd-pazza-nav-application-logo"
        className="wd-pazza-logo align-self-center col-2"
      >
        <Link
          to={`/Kambaz/Courses/${cid}/Pazza`}
          type="button"
          className="text-white wd-text-no-decor align-self-center"
        >
          pazza
        </Link>
      </div>
      <div
        id="wd-pazza-nav-course"
        className="wd-pazza-nav-tab align-content-center text-center pt-2 col-1 overflow-hidden"
      >
        {cid}
      </div>
      <div id="wd-pazza-nav-items" className="col-6 wd-pazza-flex-items">
        {links.map((link) => (
          <div
            id={`wd-pazza-nav-${link.path}`}
            className="align-content-center pt-1"
          >
            <Link
              to={`/Kambaz/Courses/${cid}/Pazza/${link.path}`}
              className={`wd-pazza-nav-tab text-nowrap align-content-center ${
                pathname.includes(link.path) ? "wd-pazza-active-underline" : ""
              }`}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
      <div
        id="wd-pazza-nav-profile"
        className="wd-pazza-nav-tab align-content-center overflow-hidden pt-1 pe-2 col-3 text-end"
      >
        <Link to={`/Kambaz/Courses/${cid}/Pazza/Profile`}>
          <img
            src="/images/default_profile.png"
            width="28px"
            className="border border-2 me-2"
          />
          <Link
            to={`/Kambaz/Courses/${cid}/Pazza/Profile`}
            className="wd-pazza-nav-tab"
          >
            {currentUser.firstName} {currentUser.lastName}
          </Link>
        </Link>
      </div>
    </div>
  );
}
