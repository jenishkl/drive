import React from "react";
import { FixedSizeList } from "react-window";

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 36;
  let minHeight = 50;
  let maxHeight = 250;
  const Row = ({ index, style }) =>
    // Ensure children[index] is valid
    React.isValidElement(children[index])
      ? React.cloneElement(children[index], { style })
      : null;
  const dynamicHeight = Math.min(
    Math.max(itemCount * itemSize, minHeight),
    maxHeight
  );
  return (
    <div ref={ref} {...other}>
      <FixedSizeList
        height={dynamicHeight}
        // width={300}
        itemSize={itemSize}
        itemCount={itemCount}
        overscanCount={5}
        style={{ outline: "none" }} // Optional: to remove default focus outline
        role={role}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
});

export default ListboxComponent;
