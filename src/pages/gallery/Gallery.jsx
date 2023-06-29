import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetchGallery();
    const interval = setInterval(fetchGallery, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("http://localhost:5000/gallery");
      const data = await response.json();
      setGalleryImages(data);
    } catch (error) {
      console.log("Errors fetching gallery images:", error);
    }
  };
  return (
    <div>
      <div className="my-4">
        <Link to="/gallery">
          <button className="btn btn-primary btn-sm">
            Upload Gallery Image{" "}
          </button>
        </Link>
        <Link className="">
          {" "}
          Total images
          <sup className="bg-indigo-500 px-2 py-1 rounded-full text-white">
            {galleryImages.length}
          </sup>
        </Link>
      </div>

      <div className="grid md:grid-cols-12 gap-4 justify-between">
        {galleryImages.length > 0 ? (
          galleryImages.map((galleryImg) => (
            <GalleryCard key={galleryImg._id} galleryImg={galleryImg} />
          ))
        ) : (
          <p>No data!</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
