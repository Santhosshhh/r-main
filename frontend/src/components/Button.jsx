import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const Button = ({ setUpdateUI }) => {
  const handleChange = (e) => {
    e.preventDefault();

    console.log(e.target.value)

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    console.log(formData)
    axios
      .post("http://localhost:3000/api/image/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <label className="button" htmlFor="file_picker">
      <AiFillPlusCircle />
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;
