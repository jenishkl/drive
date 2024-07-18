import React, { useState, useRef } from 'react';

const SelectionContainer = ({ children }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('item')) return;
    setIsSelecting(true);
    const rect = containerRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setSelectionBox({ top: startY, left: startX, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const width = Math.abs(currentX - selectionBox.left);
    const height = Math.abs(currentY - selectionBox.top);
    const left = Math.min(currentX, selectionBox.left);
    const top = Math.min(currentY, selectionBox.top);
    setSelectionBox({ top, left, width, height });
    selectItemsInBox(left, top, width, height);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const selectItemsInBox = (left, top, width, height) => {
    const items = containerRef.current.querySelectorAll('.item');
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemBox = {
        left: itemRect.left - containerRect.left,
        top: itemRect.top - containerRect.top,
        right: itemRect.right - containerRect.left,
        bottom: itemRect.bottom - containerRect.top
      };
      if (
        left + width > itemBox.left &&
        left < itemBox.right &&
        top + height > itemBox.top &&
        top < itemBox.bottom
      ) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  };

  return (
    <div
      className="selection-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
      {isSelecting && (
        <div
          className="selection-box"
          style={{
            top: selectionBox.top,
            left: selectionBox.left,
            width: selectionBox.width,
            height: selectionBox.height,
          }}
        />
      )}
    </div>
  );
};


const Item = ({ id, name }) => {
  return (
    <div className="item" id={id}>
      {name}
    </div>
  );
};


const DragSelect = () => {
  const items = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

  return (
    <SelectionContainer>
      {items.map(item => (
        <Item key={item.id} id={item.id} name={item.name} />
      ))}
    </SelectionContainer>
  );
};

export default DragSelect;

