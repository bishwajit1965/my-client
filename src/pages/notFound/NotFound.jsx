import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{ fontSize: "32px", marginBottom: "16px", fontWeight: "bold" }}
      >
        404 - Not Found
      </h1>
      <p style={{ fontSize: "16px", color: "#888" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="bg-indigo-600 text-white rounded-md px-4 py-2 my-4 shadow-lg">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
