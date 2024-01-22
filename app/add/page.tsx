"use client";

import { ContentType, content_data } from "@/content";

const AddDataPage = () => {
  const addHandler = async (animal: ContentType) => {
    const res = await fetch("/api/postcontent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    });
    if (res.ok) {
      console.log("Added animal");
    } else {
      console.log("Failed to add animal");
    }
  };

  const addData = async () => {
    for (const animal of content_data) {
      await addHandler(animal);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <button
        className="px-4 py-3 rounded-md bg-neutral-900 text-neutral-50"
        onClick={addData}
      >
        Add Data
      </button>
    </div>
  );
};

export default AddDataPage;