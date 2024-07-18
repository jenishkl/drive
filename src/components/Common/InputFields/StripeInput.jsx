// modified from https://github.com/mui/material-ui/issues/16037

import React from "react";

const StripeInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, options, ...other } = props;
  const [mountNode, setMountNode] = React.useState(null);

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        if (mountNode === null) {
          return;
        }

        mountNode.focus();
      },
    }),
    [mountNode]
  );

  return (
    <Component
      onReady={setMountNode}
      options={{
        ...options,
      }}
      {...other}
    />
  );
});

export default StripeInputComponent;
