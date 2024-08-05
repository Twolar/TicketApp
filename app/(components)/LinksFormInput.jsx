"use client";
import React, { useState, useEffect } from "react";
import {
  MusicProviderIdentifierEnum,
  MusicProviderBaseUrlEnum,
} from "../(misc)/Enums";

const LinksInput = ({ onLinksChange, name, value = [] }) => {
  const [inputProvider, setInputProvider] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [links, setLinks] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  // Synchronize the links state with the value prop
  useEffect(() => {
    setLinks(Array.isArray(value) ? value : []);
  }, [value]);

  const handleAddLink = () => {
    setErrorMessage("");
    if (inputProvider && inputUrl) {
      const expectedBaseUrl = MusicProviderBaseUrlEnum[inputProvider];

      if (!inputUrl.startsWith(expectedBaseUrl)) {
        setErrorMessage(`URL must start with ${expectedBaseUrl}`);
        return;
      }

      const newLink = { MusicProvider: inputProvider, Url: inputUrl };
      const newLinks = [...links, newLink];
      setLinks(newLinks);
      onLinksChange({ target: { name, value: newLinks } });

      // Clear input fields and error message after successful addition
      setInputProvider("");
      setInputUrl("");
      setErrorMessage("");
    }
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onLinksChange({ target: { name, value: newLinks } });
  };

  return (
    <div className="form-control mb-4">
      <div className="flex space-x-2 mb-2">
        <select
          value={inputProvider}
          onChange={(e) => setInputProvider(e.target.value)}
          className="select select-bordered"
          placeholder="Select provider"
        >
          <option value="" disabled>
            Select Provider
          </option>
          {Object.entries(MusicProviderIdentifierEnum).map(([key, value]) => (
            <option key={value} value={key}>
              {key}
            </option>
          ))}
        </select>
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="input input-bordered flex-grow"
          placeholder="Enter URL"
        />
        <button
          type="button"
          onClick={handleAddLink}
          className="btn btn-m btn-primary"
        >
          +
        </button>
      </div>
      {errorMessage && <p className="text-error mb-2">{errorMessage}</p>}
      {links.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-2 border-gray-700">
            <thead>
              <tr>
                <th>Provider</th>
                <th>URL</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <tr key={index}>
                  <td>{link.MusicProvider}</td>
                  <td className="truncate max-w-xs">{link.Url}</td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="btn btn-error btn-xs"
                      onClick={() => handleRemoveLink(index)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LinksInput;
