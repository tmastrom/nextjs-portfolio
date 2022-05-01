const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const getCuratedPhotos = async () => {
  const res = await fetch(
    `https://api.pexels.com/v1/photos/11340815`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  console.log(res);
  var responseJson = await res.json();
  return responseJson;
};