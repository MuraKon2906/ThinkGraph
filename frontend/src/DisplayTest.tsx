import axios from "axios";
import { useState, useEffect } from "react";

function DisplayTest() {
  const [name, setName] = useState("Guest");
  const [sex, setSex] = useState("Not Defined");
  const [age, setAge] = useState(0);

  const fetchdata = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/");

      setName(response.data.name);
      setSex(response.data.sex);
      setAge(response.data.age);
      console.log("Component Loaded");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1>
        Name's {name} . {age} . {sex} . Hard to ignore
      </h1>
    </div>
  );
}

export default DisplayTest;
