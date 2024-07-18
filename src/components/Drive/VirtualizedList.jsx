// VirtualizedList.jsx
import React from "react";
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style, data }) => (
  <div
    style={{ ...style, border: "1px solid #ccc", padding: "5px" }}
    className={data.isSelected(index) ? "item selected" : "item"}
  >
    {data.items[index].content}
  </div>
);

export default function VirtualizedList({ items, isSelected }) {
  return (
    <List
      height={500}
      width={300}
      itemSize={35}
      
      itemCount={items.length}
      itemData={{ items, isSelected }}
  
    >
      {Row}
    </List>
  );
}
