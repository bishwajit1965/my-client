import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const pages = Math.ceil(count / size);
  console.log(count, pages);

  useEffect(() => {
    fetch(`http://localhost:5000/students?page=${page}&size=${size}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
        setCount(data.count);
      });
  }, [page, size]);

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
        fetch(`http://localhost:5000/students/${_id}`, {
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
              setStudents(students.filter((student) => student._id !== _id));
            }
          });
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>My Client || Students</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="bg-slate-200">
              <th>#</th>
              <th>Name</th>
              <th>class</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-slate-100">
            {students.map((student, index) => (
              <tr key={student._id}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.class_name}</td>
                <td>{student.subject}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>
                  <img
                    src={student.photo}
                    alt="student-photo"
                    className="w-7 h-7 rounded-full"
                  />
                </td>
                <td className="flex space-x-3">
                  <Link to={`/edit-student/${student._id}`}>
                    <button className="btn btn-circle btn-outline btn-sm">
                      <FaEdit className="w-4 h-4 text-indigo-500 hover:text-white" />
                    </button>
                  </Link>
                  <Link onClick={() => handleDelete(student._id)}>
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
              <th>class</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
        <div className="text-center my-4">
          Page:{page + 1} and size: {size}{" "}
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              className={`btn btn-xs rounded-full m-2 ${
                page === number && "selected"
              }`}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
          <select
            className="border rounded-md ml-2"
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Students;
