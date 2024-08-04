"use client";
import React from "react";

// Define the component props
const headingLevels = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

const PageTitle = ({
  headingLevel = "h2",
  titleClasses = "text-primary text-4xl", // Default text size for the title
  title,
  subtitleClasses = "text-lg", // Default text size for the subtitle
  subtitle,
}) => {
  // Validate headingLevel, default to h2 if not valid
  const Heading = headingLevels[headingLevel] || "h2";

  return (
    <div>
      <Heading className={`font-bold ${titleClasses}`}>{title}</Heading>
      {subtitle ? (
        <p className={`py-5 ${subtitleClasses}`}>{subtitle}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageTitle;
