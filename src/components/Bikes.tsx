import { useState, useEffect } from "react";
import bikeData from "../data/bikes.json";
import BikeCard from "./BikeCard";
import { useTranslation } from "react-i18next";

const Bikes = () => {
  const { t } = useTranslation();
  const bikeEntries = Object.entries(bikeData);
  const [selectedBikeIndex, setSelectedBikeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls: string[] = [];
      
      // Collect all image URLs from bike data
      bikeEntries.forEach(([, bikeInfo]) => {
        if (bikeInfo.images && Array.isArray(bikeInfo.images)) {
          imageUrls.push(...bikeInfo.images);
        }
      });

      // Preload all images
      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    preloadImages();
  }, [bikeEntries]);

  if (isLoading) {
    return (
      <div id="bikes">
        <h1>{t("bikes.title")}</h1>
        <div className="container">
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <p>{t("bikes.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="bikes">
      <h1>{t("bikes.title")}</h1>
      <div className="container card">
        <p>{t("bikes.description")}</p>
      </div>
      <div className="container">
      <div className="bike-tabs">
        {bikeEntries.map(([bikeKey], index) => (
          <button
            key={bikeKey}
            className={`bike-tab ${selectedBikeIndex === index ? "active" : ""}`}
            onClick={() => setSelectedBikeIndex(index)}
          >
            {bikeKey}
          </button>
        ))}
      </div>
        <BikeCard
          key={bikeEntries[selectedBikeIndex][0]}
          title={bikeEntries[selectedBikeIndex][0]}
          data={bikeEntries[selectedBikeIndex][1]}
        />
      </div>
    </div>
  );
};

export default Bikes;
