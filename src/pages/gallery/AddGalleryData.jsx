import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddGalleryData = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data.name, data.photoUrl);
    const galleryData = {
      name: data.name,
      photoUrl: data.photoUrl,
    };
    console.log(galleryData);

    fetch("http://localhost:5000/gallery", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(galleryData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Gallery image uploaded!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/view-gallery");
        }
      });
  };

  return (
    <div className="my-10 p-2">
      <Helmet>
        <title>My Client || Add gallery Image</title>
      </Helmet>
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold">Upload Gallery Image</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
          <div className="form-control col-span-6">
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              placeholder="Name..."
              className="input input-bordered h-7"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                Name is required
              </p>
            )}
          </div>
          <div className="form-control col-span-6">
            <input
              type="url"
              name="photoUrl"
              {...register("photoUrl", { required: true })}
              placeholder="Photo url..."
              className="input input-bordered h-7"
              aria-invalid={errors.photoUrl ? "true" : "false"}
            />
            {errors.photoUrl?.type === "required" && (
              <p className="text-red-600 text-xs mt-1" role="alert">
                Photo url is required
              </p>
            )}
          </div>
        </div>
        <div className="form-control w-full">
          <button type="submit" className="btn btn-primary">
            Upload Gallery Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGalleryData;
