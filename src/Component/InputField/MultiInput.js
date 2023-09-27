import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const MultiInput = ({ data, labels, placeholders, star, onChange }) => {
  const [inputFields, setInputFields] = useState(
    data?.map((itm) => ({ id: Date.now(), value: itm })) ?? [
      { id: Date.now(), value: "" },
    ]
  );

  const handleAddInputField = () => {
    const newInputFields = [...inputFields, { id: Date.now(), value: "" }];
    setInputFields(newInputFields);
  };

  const handleRemoveInputField = (id) => {
    const newInputFields = inputFields.filter((field) => field.id !== id);
    setInputFields(newInputFields);
  };

  const handleInputChange = (id, value) => {
    const updatedInputFields = inputFields.map((field) => {
      if (field.id === id) {
        return { ...field, value };
      }
      return field;
    });
    setInputFields(updatedInputFields);
  };

  useEffect(() => {
    onChange(inputFields?.map((itm) => itm?.value));
  }, [inputFields]);

  return (
    <div className="position-relative">
      {inputFields.map((field, index) => (
        <div className="new-input-field" key={field.id}>
          <div className="input-row">
            <label>
              {labels[index]} <span className="input_star">{star}</span>{" "}
            </label>
            <input
              type="text"
              placeholder={placeholders}
              value={field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            {index > 0 && (
              <BsTrash
                className="delete-icon"
                onClick={() => handleRemoveInputField(field.id)}
              />
            )}
          </div>
        </div>
      ))}
      <div className="icon-input-field">
        <AiOutlinePlus className="add-icon" onClick={handleAddInputField} />
      </div>
    </div>
  );
};

export default MultiInput;
