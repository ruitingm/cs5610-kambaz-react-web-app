import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import ProhibitedMark from "./ProhibitedMark";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";

export default function ModulesControls({
  moduleName,
  setModuleName,
  createModuleForCourse,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  createModuleForCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {isFaculty && (
        <>
          <button
            id="wd-add-module-btn"
            className="btn btn-lg btn-danger me-1 float-end"
            data-bs-toggle="modal"
            data-bs-target="#wd-add-module-dialog"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            ></FaPlus>
            Module
          </button>
          <div className="dropdown d-inline me-1 float-end">
            <button
              id="wd-publish-all-btn"
              className="btn btn-lg btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <GreenCheckmark />
              Publish All
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  id="wd-publish-all-modules-and-items-btn"
                  className="dropdown-item"
                  href="#"
                >
                  <GreenCheckmark />
                  Publish all modules and items
                </a>
              </li>
              <li>
                <a
                  id="wd-publish-modules-only-button"
                  className="dropdown-item"
                  href="#"
                >
                  <GreenCheckmark />
                  Publish modules only
                </a>
              </li>
              <li>
                <a
                  id="wd-unpublish-all-modules-and-items"
                  className="dropdown-item"
                  href="#"
                >
                  <ProhibitedMark />
                  Unpublish all modules and items
                </a>
              </li>
              <li>
                <a id="wd-unpublish-modules-only" className="dropdown-item">
                  <ProhibitedMark />
                  Unpublish modules only
                </a>
              </li>
            </ul>
          </div>
          <ModuleEditor
            dialogTitle="Add Module"
            moduleName={moduleName}
            setModuleName={setModuleName}
            createModuleForCourse={createModuleForCourse}
          />
        </>
      )}
      {
        <>
          <button
            id="wd-view-progress-btn"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            View Progress
          </button>
          <button
            id="wd-collapse-all-btn"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            Collapse All
          </button>
        </>
      }
    </div>
  );
}
