import { Box, Tooltip, useTheme } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import React from "react";
import { useState } from "react";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import ClickAwayListener from "@mui/material/ClickAwayListener";
export default function EmojiPick({ onChange }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  //   (e) => setMsg((prev) => prev + e.emoji)
  return (
    <ClickAwayListener onClickAway={() =>{}}>
      <Tooltip
      key={open}
        title={
          <EmojiPicker
            open={open}
            lazyLoadEmojis={true}
            onEmojiClick={onChange}
            reactionsDefaultOpen={false}
            theme={theme.mode}
            
            suggestedEmojisMode={false}
            emojiStyle="apple"
          />
        }
        onClose={() => setOpen(false)}
        onBlur={() => setOpen(false)}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        arrow
        variant="emoji"
      >
        <Box onClick={() => setOpen(!open)}>
          <BsFillEmojiSunglassesFill
            color="#FFA602"
            className="pointer-hand"
            size={20}
          />
        </Box>
      </Tooltip>
    </ClickAwayListener>
  );
}
