import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch("http://localhost:5000/users")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUsers(data);
    //   });
    fetchUsers();
    // Set up the interval to fetch updated user data every 5 seconds
    const interval = setInterval(fetchUsers, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      // Make an API request to fetch the updated user data from the backend
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${_id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Student data has been deleted.",
                "success"
              );
              setUsers(users.filter((dbUser) => dbUser._id !== _id));
            }
          });
      }
    });
  };
  const handleMakeAdmin = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${_id}`, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire(
                "Updated!",
                `${user.displayName} is admin now!`,
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="">
      <Helmet>
        <title>My Client || All Users</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="bg-slate-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((dbUser, index) => (
              <tr key={dbUser._id}>
                <th>{index + 1}</th>
                <td>{dbUser.name}</td>
                <td>{dbUser.email}</td>
                <td>
                  {dbUser.role === "admin" ? (
                    "Admin"
                  ) : (
                    <FaUser onClick={() => handleMakeAdmin(dbUser._id)} />
                  )}
                </td>
                <td>
                  <Link onClick={() => handleDelete(dbUser._id)}>
                    <button className="btn btn-circle btn-outline btn-sm">
                      <FaTrash className="w-4 h-4 text-red-500 hover:text-white" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
