const getIndexedImageUrl = (index) => {
  const imageCount = 4;
  const cycleIndex = (index % imageCount) + 1;
  const imageName = `coffe${cycleIndex}.jpg`;

  try {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  } catch (err) {
    console.error(`Image not found: ${imageName}`, err);
    return "https://via.placeholder.com/400x200/B0B0B0/FFFFFF?text=No_Image";
  }
};

export default getIndexedImageUrl;
