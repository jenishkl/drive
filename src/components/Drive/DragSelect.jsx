"use client";
import React, { useState, useRef } from "react";
import { debounce } from "lodash";
const Item = React.memo(({ content }) => {
  return <div style={{ width: "100px", height: "100px" }}>{content}</div>;
});

const DragSelect = ({ onItemSelect, children }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setIsSelecting(true);
    setStartPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setEndPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onMouseMove = debounce((e) => {
    if (isSelecting) {
      const rect = containerRef.current.getBoundingClientRect();
      setEndPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, 1);

  const onMouseUp = () => {
    setIsSelecting(false);
    onItemSelect(startPosition, endPosition);
  };

  const selectionStyle = {
    left: Math.min(startPosition.x, endPosition.x),
    top: Math.min(startPosition.y, endPosition.y),
    width: Math.abs(endPosition.x - startPosition.x),
    height: Math.abs(endPosition.y - startPosition.y),
  };

  return (
    <div
      ref={containerRef}
      className="select-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {isSelecting && (
        <div className="selection-box" style={selectionStyle}></div>
      )}
      {children}
    </div>
  );
};

export default DragSelect;
