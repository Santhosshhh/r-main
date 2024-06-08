import { useEffect, useState } from "react";
import Button from "./Button";
import Grid from "./Grid";
import Navbar from "./Navbar";
import axios from "axios";
import "../index.css";

const PhotoBlog = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    console.log("Hello")
    axios
      .get("http://localhost:3000/api/image/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  console.log("YO")

  return (
    <div className="App">
      <Navbar />
      <Grid photos={photos} />
      <Button setUpdateUI={setUpdateUI} />
    </div>
  );
}

export default PhotoBlog;
