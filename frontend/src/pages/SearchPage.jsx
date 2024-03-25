import { useParams } from "react-router-dom";

export const SearchPage = () => {
  // search query
  const { input } = useParams();

  // possible search filters
  // search term
  // type: sell or rent
  // Sort: price low to high, high to low, newest, oldest

  return (
    <div>
      SearchPage
      <h1>{input}</h1>
    </div>
  );
};
