import React from "react";

const ComponentLibrary = () => {
  const onDragStart = (event, componentType) => {
    event.dataTransfer.setData("componentType", componentType);
  };

  return (
    <div className="w-full flex flex-col gap-3 p-3">
      <button
        draggable
        onDragStart={(e) => onDragStart(e, "button")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Drag Button
      </button>

      <input
        type="text"
        draggable
        onDragStart={(e) => onDragStart(e, "input")}
        className="p-2 border"
        placeholder="Drag Input"
      />

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "image")}
        className="border p-2 flex items-center justify-center cursor-pointer"
      >
        🖼️ Drag Image
      </div>
    </div>
  );
};

export default ComponentLibrary;
