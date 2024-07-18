import React, { useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import {
  Box,
  ClickAwayListener,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@mui/material";
import { createRoot } from "react-dom/client";

function TextEditor({
  initialContent,
  toolbar = true,
  readonly = false,
  save = () => {},
  onChange = () => {},
  placeholders = [
    "%clientName%",
    "%companyName%",
    "%firstName%",
    "%lastName%",
    "%caseName%",
    "%clientId%",
    "%service%",
  ],
}) {
  const [data, setData] = useState(initialContent);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const theme = useTheme();
  const copyStringToClipboard = function (str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const PopupContent = ({ placeholders, onSelected }) => {
    return (
      <ClickAwayListener onClickAway={() => setShowPlaceholder(false)}>
        <Tooltip
          open={showPlaceholder}
          onClose={() => setShowPlaceholder(false)}
        >
          {placeholders.map((placeholder) => (
            <MenuItem
              key={placeholder}
              value={placeholder}
              onClick={() => onSelected(placeholder)}
            >
              {placeholder}
            </MenuItem>
          ))}
        </Tooltip>
      </ClickAwayListener>
    );
  };

  const PlaceholderPopup = (editor, current, self, close) => {
    setShowPlaceholder(!showPlaceholder);

    let savedSelection = editor.selection.save();
    const onSelected = (value) => {
      const mergeField = value;
      if (mergeField) {
        editor.focus();

        editor.selection.restore(savedSelection);

        editor.selection.insertHTML(mergeField);

        close?.();
      }
    };

    const divElement = document.createElement("div");

    document.body.appendChild(divElement);

    const root = createRoot(divElement);
    root.render(
      <PopupContent placeholders={placeholders} onSelected={onSelected} />
    );

    return divElement;
  };

  const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    // "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",

    {
      name: "{ }",
      tooltip: "Insert Placeholder",
      popup: PlaceholderPopup,
    },
    "|",
    {
      name: "Copy",
      tooltip: "Copy HTML to Clipboard",
      // iconURL: "images/copy.png",
      exec: function (editor) {
        let html = editor.value;
        copyStringToClipboard(html);
      },
    },
    "|",
    {
      name: "Save",
      tooltip: "Save Data",
      // iconURL: "images/copy.png",
      exec: function () {
        console.log(data);
        save(data);
      },
    },
    "|",
  ];

  const editorConfig = useMemo(() => {
    return {
      theme: theme.mode,
      readonly: readonly,
      toolbar: toolbar,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      addNewLine: false,
      // statusbar:false,
      //defaultActionOnPaste: "insert_clear_html",
      buttons: buttons,
      uploader: {
        insertImageAsBase64URI: true,
      },
    };
  }, [theme, readonly, toolbar, initialContent]);

  return (
    <Box>
      <JoditEditor
        key={initialContent}
        value={data}
        config={editorConfig}
        onChange={(value) => {
          setData(value);
          onChange(value);
        }}
      />
    </Box>
  );
}

export default TextEditor;
