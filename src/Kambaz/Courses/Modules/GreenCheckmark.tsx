import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle
        style={{ top: "2px", right: "1px" }}
        className="text-success me-1 position-absolute fs-5"
      ></FaCheckCircle>
      <FaCircle className="text-white me-2 fs-6"></FaCircle>
    </span>
  );
}
