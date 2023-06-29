import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditStudent = () => {
  const student = useLoaderData();
  const { _id, id, name, class_name, photo, email, subject, phone, address } =
    student;

  const navigate = useNavigate();

  const handleUpdateStudent = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = form.id.value;
    const photo = form.url.value;
    const name = form.name.value;
    const class_name = form.class_name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const UpdatableStudentData = {
      id,
      photo,
      name,
      class_name,
      email,
      subject,
      phone,
      address,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "If you are sure, proceed !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/students/${_id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(UpdatableStudentData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              Swal.fire(
                "Updated!",
                "Student data has been updated.",
                "success"
              );
              navigate("/students");
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>My Client || Edit Student</title>
      </Helmet>
      <div className="overflow-x-auto w-full md:my-5 p-1">
        <form onSubmit={handleUpdateStudent}>
          <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
            <div className="form-control col-span-4">
              <input
                type="number"
                name="id"
                defaultValue={id}
                placeholder="Photo url..."
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="url"
                defaultValue={photo}
                placeholder="Photo url..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="name"
                defaultValue={name}
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
                defaultValue={phone}
                placeholder="Phone..."
                className="input input-bordered capitalize"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="email"
                name="email"
                defaultValue={email}
                placeholder="Email address..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-4">
              <input
                type="text"
                name="subject"
                defaultValue={subject}
                placeholder="Subject..."
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
            <div className="form-control col-span-6">
              <select
                name="class_name"
                defaultValue={class_name}
                className="input input-bordered"
              >
                <option value={class_name}>{class_name}</option>
                <option value="higher-secondary">Higher Secondary</option>
                <option value="honours">Honours</option>
                <option value="masters">Masters</option>
              </select>
            </div>
            <div className="form-control col-span-6">
              <input
                type="text"
                name="address"
                defaultValue={address}
                placeholder="Address..."
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <button
              type="submit"
              className="bg-indigo-500 w-full text-white py-4 rounded-md uppercase"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
