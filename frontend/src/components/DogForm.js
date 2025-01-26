import { useState } from "react";
import axios from "axios";

const DogForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    await axios.post("http://localhost:5000/api/dogs", { name, meaning });
    refresh();
    setName("");
    setMeaning("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Funny Dog Name" required />
      <input type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="Meaning (optional)" />
      <button type="submit">Add</button>
    </form>
  );
};

export default DogForm;
