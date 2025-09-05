import React, { ChangeEvent, useState } from 'react';
import { AppBar } from '../components/AppBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const Publish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content: description
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <AppBar />
      <main className="flex-grow flex justify-center w-full pt-12 px-4">
        <div className="max-w-screen-lg w-full space-y-4">
          <DraftEditor
            title={title}
            description={description}
            onTitleChange={(e) => setTitle(e.target.value)}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            onPublish={handlePublish}
          />
        </div>
      </main>
    </div>
  );
};

export const DraftEditor = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onPublish,
}: {
  title: string;
  description: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPublish: () => void;
}) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Title"
        className="mt-4 text-lg font-medium text-gray-900 border-b border-gray-300 focus:outline-none w-full"
      />
      <TextEditor value={description} onChange={onDescriptionChange} />
      <div className="flex justify-end mt-4">
        <button
          onClick={onPublish}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

function TextEditor({ value, onChange }: { value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-b-lg mt-6">
      <textarea
        value={value}
        onChange={onChange}
        rows={12}
        className="w-full p-4 text-gray-900 text-sm resize-none outline-none bg-gray-50 placeholder-gray-400 rounded-b-lg"
        placeholder="Write your article here..."
      />
    </div>
  );
}