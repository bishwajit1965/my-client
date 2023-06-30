import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowAltCircleRight, FaRegEdit } from "react-icons/fa";

const EditGalleryImage = () => {
  const galleryImgData = useLoaderData();
  const { _id, name, photoUrl } = galleryImgData;
  console.log(galleryImgData);

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

    fetch(`http://localhost:5000/gallery/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(galleryData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Gallery image updated!",
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
        <h2 className="text-3xl font-bold">Update Gallery Image</h2>
      </div>
      <div className="grid md:grid-cols-12 gap-4 justify-between">
        <div className="col-span-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-12 items-center gap-4 w-full mb-4">
              <div className="form-control col-span-12">
                <input
                  type="text"
                  defaultValue={name}
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
              <div className="form-control col-span-12">
                <input
                  type="url"
                  defaultValue={photoUrl}
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
            <div className="grid grid-cols-12 gap-4 justify-between">
              <div className="col-span-6">
                <button type="submit" className="btn btn-primary w-full">
                  <FaRegEdit />
                  Update Gallery
                </button>
              </div>
              <div className="col-span-6">
                <Link to="/view-gallery">
                  <button className="btn btn-warning w-full">
                    Gallery
                    <FaArrowAltCircleRight />
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-6">
          <img src={photoUrl} alt="" className="w-full h-80 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default EditGalleryImage;
