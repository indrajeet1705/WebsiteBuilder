import React, { useState } from "react";
import ComponentLibrary from "./Components/ComponentLibrary";

const App = () => {
  const [droppedElements, setDroppedElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [properties, setProperties] = useState({});

  const onDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");

    const newElement = { id: Date.now(), type: componentType, props: {} };
    setDroppedElements([...droppedElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const updateProperties = (id, newProps) => {
    setDroppedElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, props: newProps } : el))
    );
  };

  return (
    <div className="flex items-center w-full h-screen justify-center">

      <div className="w-[20vw] h-screen flex-col flex p-4 text-black bg-purple-700">
        <div className="w-full h-[50px] border flex items-center justify-center text-white">
          Components
        </div>
        <ComponentLibrary />
      </div>

    
      <div
        className="w-[60vw] h-screen border-dashed border-black border p-4 flex flex-col gap-3"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="w-full h-[50px] flex items-center justify-center bg-purple-500 p-4 text-white">
          Drag & Drop Components
        </div>

    
        <div className="flex flex-wrap gap-4 p-4 border">
          {droppedElements.map((el) => (
            <div
              key={el.id}
              className="p-2 border cursor-pointer"
              onClick={() => setSelectedElement(el.id)}
            >
              {el.type === "button" && (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  style={el.props}
                >
                  {el.props.text || "Click me"}
                </button>
              )}
              {el.type === "input" && (
                <input
                  type="text"
                  className="p-2 border"
                  style={el.props}
                  placeholder={el.props.placeholder || "Enter text"}
                />
              )}
              {el.type === "image" && (
                <img
                  src={el.props.src || "https://via.placeholder.com/100"}
                  alt="Dropped"
                  className="w-20 h-20 border"
                  style={el.props}
                />
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="w-[20vw] h-screen p-4 bg-gray-100 border-l">
        <h3 className="text-lg font-semibold">Customize Component</h3>
        {selectedElement &&
          (() => {
            const selected = droppedElements.find((el) => el.id === selectedElement);
            if (!selected) return null;

            return (
              <div className="flex flex-col gap-3 mt-4">
                {selected.type === "button" && (
                  <>
                    <label>Button Text</label>
                    <input
                      type="text"
                      className="p-2 border"
                      value={selected.props.text || ""}
                      onChange={(e) =>
                        updateProperties(selected.id, { ...selected.props, text: e.target.value })
                      }
                    />
                    <label>Background Color</label>
                    <input
                      type="color"
                      value={selected.props.backgroundColor || "#1E40AF"}
                      onChange={(e) =>
                        updateProperties(selected.id, { ...selected.props, backgroundColor: e.target.value })
                      }
                    />
                  </>
                )}

                {selected.type === "input" && (
                  <>
                    <label>Placeholder</label>
                    <input
                      type="text"
                      className="p-2 border"
                      value={selected.props.placeholder || ""}
                      onChange={(e) =>
                        updateProperties(selected.id, { ...selected.props, placeholder: e.target.value })
                      }
                    />
                    <label>Width</label>
                    <input
                      type="text"
                      className="p-2 border"
                      value={selected.props.width || "100px"}
                      onChange={(e) =>
                        updateProperties(selected.id, { ...selected.props, width: e.target.value })
                      }
                    />
                  </>
                )}
              </div>
            );
          })()}
      </div>
    </div>
  );
};

export default App;
