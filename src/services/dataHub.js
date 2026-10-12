
import API_BASE_URL from "../config";

export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await response.json();
}
