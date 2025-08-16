import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const { addBook } = useApp();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title required");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("author", author);
    fd.append("description", description);
    if (cover) fd.append("cover", cover);

    try {
      await addBook(fd);
      alert("Book added!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Book</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <input
            type="file"
            id="coverUpload"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <label
            htmlFor="coverUpload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Upload Cover
          </label>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 h-40 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 border rounded bg-blue-500 text-white cursor-pointer"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
