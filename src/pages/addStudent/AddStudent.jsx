import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddStudent = () => {
  const handleAddStudent = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = form.id.value;
    const photo = form.url.value;
    const name = form.name.value;
    const class_name = form.class_name.value;
    const subject = form.subject.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const studentInputData = {
      id,
      photo,
      name,
      class_name,
      subject,
      email,
      phone,
      address,
    };
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(studentInputData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Student data added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>My Client || Add Student</title>
      </Helmet>
      <div className="overflow-x-auto w-full md:my-5 p-1">
        <form onSubmit={handleAddStudent}>
          <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
            <div className="form-control col-span-4">
              <input
                type="number"
                name="id"
                placeholder="Id..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="url"
                placeholder="Photo url..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="name"
                placeholder="Name..."
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
            <div className="form-control col-span-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone..."
                className="input input-bordered capitalize"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="email"
                name="email"
                placeholder="Email address..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="subject"
                placeholder="Subject..."
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
            <div className="form-control col-span-6">
              <select name="class_name" className="input input-bordered">
                <option>Select Class</option>
                <option value="higher-secondary">Higher Secondary</option>
                <option value="honours">Honours</option>
                <option value="masters">Masters</option>
              </select>
            </div>
            <div className="form-control col-span-6">
              <input
                type="text"
                name="address"
                placeholder="Address..."
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-indigo-500 w-full text-white py-4 rounded-md uppercase"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
