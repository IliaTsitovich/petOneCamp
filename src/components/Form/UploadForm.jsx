import React, { useState } from "react";
const PORT = 3000;

function UploadForm() {
  const [data, setData] = useState({ name: "", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', selectedFile);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Успех:', result);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
