async function getApiData(tabUrl) {
  const reqUrl = `https://hw.arpeely.ai/domain/info?domain=${tabUrl}`;
  const headers = {
    "X-Best-Pokemon": "Poliwhirl",
  };
  try {
    const response = await fetch(reqUrl, {
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default getApiData;
