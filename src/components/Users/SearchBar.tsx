import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;
