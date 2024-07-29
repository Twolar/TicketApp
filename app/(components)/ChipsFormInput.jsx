"use client";
import React, { useState, useEffect } from "react";

const CreateNewText = "+ Add New";

const ChipsInput = ({ suggestions, onChipsChange, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions([...filtered, CreateNewText]);
    } else {
      setFilteredSuggestions([]);
    }
    setSelectedIndex(-1); // Reset selected index when input changes
  };

  const handleAddChip = (chip) => {
    if (chip && !chips.includes(chip) && chip !== CreateNewText) {
      const newChips = [...chips, chip];
      setChips(newChips);
      onChipsChange({ target: { name, value: newChips } }); // Forward to onChipsChange with dynamic name
    }
    setInputValue("");
    setFilteredSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleAddNewChip = () => {
    if (inputValue && !chips.includes(inputValue)) {
      const newChips = [...chips, inputValue];
      setChips(newChips);
      onChipsChange({ target: { name, value: newChips } }); // Forward to onChipsChange with dynamic name
    }
    setInputValue("");
    setFilteredSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleRemoveChip = (chip) => {
    const newChips = chips.filter((c) => c !== chip);
    setChips(newChips);
    onChipsChange({ target: { name, value: newChips } }); // Forward to onChipsChange with dynamic name
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        selectedIndex === -1 ||
        filteredSuggestions[selectedIndex] === CreateNewText
      ) {
        handleAddNewChip();
      } else {
        handleAddChip(filteredSuggestions[selectedIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? filteredSuggestions.length - 1 : prevIndex - 1
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === CreateNewText) {
      handleAddNewChip();
    } else {
      handleAddChip(suggestion);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [inputValue]);

  return (
    <div className="form-control">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input input-bordered input-md w-full mb-2"
          placeholder="Type and press enter to add"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-neutral rounded shadow-lg z-10">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-2 cursor-pointer input-md hover:bg-neutral-600 hover:rounded ${
                  index === selectedIndex ? "bg-neutral-700 text-gray-200" : ""
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-wrap mb-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="badge badge-primary mr-2 mb-2 cursor-pointer"
            onClick={() => handleRemoveChip(chip)}
          >
            {chip} <span className="ml-2 text-gray-200">&times;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipsInput;
