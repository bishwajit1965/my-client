import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const GalleryCard = ({ galleryImg }) => {
  const { _id, photoUrl, name } = galleryImg;

  const handleGalleryDelete = (_id) => {
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
        fetch(`http://localhost:5000/gallery/${_id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Gallery image has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="col-span-3">
      <img src={photoUrl} alt="gallery-image" className="w-full h-72" />
      <p>{name}</p>
      <div className="flex justify-between bg-indigo-600 mb-5 p-2">
        <Link to={`/edit-gallery-image/${_id}`} className="text-white">
          <FaEdit />
        </Link>
        <Link onClick={() => handleGalleryDelete(_id)} className="text-white">
          <FaTrashAlt />
        </Link>
      </div>
    </div>
  );
};

export default GalleryCard;
