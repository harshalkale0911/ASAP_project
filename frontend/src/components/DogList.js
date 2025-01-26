import { useEffect, useState } from "react";
import axios from "axios";

const DogList = () => {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const { data } = await axios.get("http://localhost:5000/api/dogs");
    setDogs(data);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <h2>Funny Dog Names</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog._id}>{dog.name} - {dog.meaning}</li>
        ))}
      </ul>
    </div>
  );
};

export default DogList;
