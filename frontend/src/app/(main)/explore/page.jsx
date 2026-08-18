import ExploreContentDefault from "@/components/ExploreContent/ExploreContentDefault";
import { API_URL } from "../../../../constants/api";

const categories = [
  'interior',
  'exterior',
  'house',
  'town',
  'castle',
  'redstone'
];

export default async function ExplorePage() {
  const categoryData = await Promise.all(
    categories.map(async (category) => {
      try {
        const response = await fetch(`${API_URL}/posts/category/${category}`);

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);

        const image =
          data.length > 0 && data[randomIndex]?.images?.[0]
            ? data[randomIndex].images[randomIndex] // preserved from your original logic
            : null;

        return { category, image };
      } catch (error) {
        console.error('Error getting image:', error);
        return { category, image: null };
      }
    })
  );

  return <ExploreContentDefault categoryData={categoryData} />;
}