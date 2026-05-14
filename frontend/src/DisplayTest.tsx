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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-700 bg-zinc-900/70 backdrop-blur-lg shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {name.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{name}</h1>

            <p className="text-zinc-400">Profile Information</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-zinc-800 p-5 border border-zinc-700">
            <p className="text-zinc-400 text-sm">Age</p>
            <h2 className="text-2xl font-semibold text-white mt-2">{age}</h2>
          </div>

          <div className="rounded-2xl bg-zinc-800 p-5 border border-zinc-700">
            <p className="text-zinc-400 text-sm">Sex</p>
            <h2 className="text-2xl font-semibold text-white mt-2">{sex}</h2>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
          <p className="text-lg text-purple-300 font-medium">
            “Name's {name}. {age}. {sex}. Hard to ignore.”
          </p>
        </div>
      </div>
    </div>
  );
}

export default DisplayTest;
