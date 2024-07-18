// App.jsx
import React, { useCallback, useState } from "react";
import DragSelect from "./DragSelect";
import VirtualizedList from "./VirtualizedList";

const DragComponent = () => {
  const [items, setItems] = useState(
    new Array(1000)
      .fill(null)
      .map((_, index) => ({ id: index, content: `Item ${index}` }))
  );
  const [selectedIndices, setSelectedIndices] = useState(new Set());

  const isSelected = (index) => {
    console.log("index", index);
    selectedIndices.has(index);
  };

  //   const onItemSelect = (start, end) => {
  //     console.log("start,end", start, end);
  //     // Implement your selection logic here
  //     // This example doesn't automatically select items, but you would check here
  //     // to see which items fall within the start and end coordinates
  //   };
  const itemHeight = 35; // Height of each item in the virtual list

  const onItemSelect = useCallback(
    (start, end) => {
      const newSelectedIndices = new Set(selectedIndices);
      const top = Math.min(start.y, end.y);
      const bottom = Math.max(start.y, end.y);

      items.forEach((item, index) => {
        const itemTop = index * itemHeight;
        const itemBottom = itemTop + itemHeight;

        // Check if the item is within the selection box
        if (itemTop < bottom && itemBottom > top) {
          newSelectedIndices.add(index);
        }
      });

      setSelectedIndices(newSelectedIndices);
    },
    [items, selectedIndices, itemHeight]
  );
  return (
    <DragSelect onItemSelect={onItemSelect}>
      <VirtualizedList items={items} isSelected={isSelected} />
    </DragSelect>
  );
};

export default DragComponent;
