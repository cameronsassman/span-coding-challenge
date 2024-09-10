import { useEffect, useState } from "react";
import { fetchTopicPhotos } from "../utils/api";
import "./PhotoGrid.css";

interface Photo {
  id: string;
  user: { name: string };
  urls: { regular: string };
  description: string;
}

interface PhotoGridProps {
  topic: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ topic }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photosData = await fetchTopicPhotos(topic);
        setPhotos(photosData);
      } catch (error) {
        console.error(`Error fetching photos for topic ${topic}:`, error);
      }
    };

    loadPhotos();
  }, [topic]);

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => Math.min(prev + 1, photos.length - 1));
  };

  const handlePrev = () => {
    setCurrentPhotoIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="photo-grid-wrapper">
      {photos.length > 0 ? (
        <>
          <button
            onClick={handlePrev}
            disabled={currentPhotoIndex === 0}
            className="nav-button"
          >
            &lt;
          </button>
          <div className="photo-grid">
            {photos
              .slice(currentPhotoIndex, currentPhotoIndex + 3)
              .map((photo) => (
                <div key={photo.id} className="photo-card">
                  <h4>{photo.user.name}</h4>
                  <img
                    src={photo.urls.regular}
                    alt={photo.description || "Photo"}
                  />
                </div>
              ))}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPhotoIndex >= photos.length - 3}
            className="nav-button"
          >
            &gt;
          </button>
        </>
      ) : (
        <p className="no-photos-message">No photos found</p>
      )}
    </div>
  );
};

export default PhotoGrid;
