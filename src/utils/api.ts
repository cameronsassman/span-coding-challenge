const UNSPLASH_API_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = "E6D8scZ3gJ8HeMEj7XbXw0dC12MMk4iw75JI7cb37wo";

export const fetchTopics = async () => {
  const response = await fetch(`${UNSPLASH_API_BASE_URL}/topics`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }

  return await response.json();
};

export const fetchTopicPhotos = async (topic: string) => {
  const response = await fetch(
    `${UNSPLASH_API_BASE_URL}/topics/${topic}/photos`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch photos for topic: ${topic}`);
  }

  return await response.json();
};
