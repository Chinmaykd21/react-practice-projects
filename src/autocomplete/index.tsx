import { ChangeEvent, FC, useEffect, useState } from "react";
import "./index.css";

const mockAPI = (query: string): Promise<string[]> => {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Raspberry",
    "Cherry",
    "Peach",
    "Pear",
    "Plum",
    "Watermelon",
    "Cantaloupe",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Lime",
    "Pomegranate",
    "Papaya",
    "Guava",
    "Fig",
    "Lychee",
    "Coconut",
    "Apricot",
    "Blackberry",
    "Cranberry",
    "Dragonfruit",
    "Durian",
    "Passionfruit",
    "Jackfruit",
    "Starfruit",
    "Tangerine",
    "Nectarine",
    "Persimmon",
    "Gooseberry",
    "Mulberry",
    "Avocado",
    "Custard Apple",
  ];

  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(query)
  );

  return new Promise((resolve) => {
    if (!query) {
      resolve([]);
    } else {
      setTimeout(() => {
        resolve(filteredFruits);
      }, 1000);
    }
  });
};

type ResultsProps = {
  fruits: string[];
};

const Results: FC<ResultsProps> = ({ fruits }) => {
  if (!fruits || fruits.length === 0)
    return (
      <p className="no-result" role="option">
        No Fruits Found
      </p>
    );
  return (
    <ul>
      {fruits.map((fruit, idx) => (
        <li key={`${fruit}-${idx}`} className="fruit">
          {fruit}
        </li>
      ))}
    </ul>
  );
};

const useDebouncedQuery = (query: string, delay: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [query, delay]);

  return debouncedQuery;
};

export const AutoComplete = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);
  const debouncedQuery = useDebouncedQuery(query);
  const [cachedResult, setCachedResult] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    (async () => {
      const trimmedQuery = debouncedQuery.trim();
      if (!trimmedQuery) {
        setResult([]);
        return;
      }

      if (cachedResult[trimmedQuery]) {
        setResult(cachedResult[trimmedQuery]);
        console.log("Cache Hit", cachedResult[trimmedQuery]);
      } else {
        console.log("Cache miss");
        try {
          const data = await mockAPI(debouncedQuery);
          setCachedResult((prevCache) => ({
            ...prevCache,
            [trimmedQuery]: data,
          }));
          setResult(data);
        } catch (error) {
          console.error("Error: ", error);
          setResult([]);
        }
      }
    })();
  }, [debouncedQuery, cachedResult]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "searchQuery") {
      setQuery(value);
    }
  };

  return (
    <div className="autocomplete-container">
      <div className="form-group">
        <label htmlFor="searchQuery">Search:</label>
        <input
          name="searchQuery"
          onChange={handleChange}
          value={query}
          placeholder="Enter Search Query"
          className="searchInput"
        />
      </div>
      <Results fruits={result} />
    </div>
  );
};
