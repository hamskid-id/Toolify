"use client";
import React from "react";

export const Text = ({ 
  style = "", 
  children, 
  onClick, 
  as = "div",
  ...props 
}) => {
  // List of valid HTML tags that can be used
  const validTags = [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "span", "div", "a", "strong", "em",
    "small", "label", "button", "li", "ul", "ol"
  ];

  // Determine the element type - default to div if invalid
  const Element = validTags.includes(as) ? as : "div";

  // Handle click events if provided
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Prepare element props
  const elementProps = {
    className: style,
    ...(onClick && { onClick: handleClick }),
    ...props
  };

  // Add role="button" for clickable anchors for accessibility
  if (Element === "a" && onClick) {
    elementProps.role = "button";
  }

  return React.createElement(Element, elementProps, children);
};