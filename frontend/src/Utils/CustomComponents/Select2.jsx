//Added by Abhishek Singh,LAM
//Purpose :- Customized select button compatible with react-hook-form
// Use :- In case where  select button is with a search field
// SYNTAX to follow while using on page --->
//<Controller
//  name="itemPartNo"
//  control={control}
//  render={({ field, fieldState }) => (
//    <div>
//      <Select2
//       items={items}
//        label="Select Item Part Number"
//        value={field.value}
//       onChange={field.onChange}
//       displayKey="part_number"
//        valueKey="id"
//        descriptionKey="description"
//      />
//      {!!fieldState.error && (
//        <p style={{ color: "red", fontSize: "0.8rem" }}>
//          {fieldState.error?.message ?? " "}
//        </p>
//      )}
 //   </div>
//  )}
///>;
// --------Don't forget to import this component on your page---------


import React, { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Paper } from "@mui/material";

export default function Select2({
  items = [],
  label = "Select",
  value = "",
  onChange,
  displayKey = "product_no",
  valueKey = "id",
  descriptionKey = null,
  limit = 50,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  const selectedItem = items.find((item) => item[valueKey] === value);

  const filtered = items.filter((item) =>
    item[displayKey].toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, Math.min(filtered.length, limit) - 1),
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      const item = filtered[highlightedIndex];
      if (item) {
        onChange(item[valueKey]);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <TextField
        fullWidth
        label={label}
        value={open ? search : selectedItem ? selectedItem[displayKey] : ""}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => {
          setSearch("");
          setOpen(true);
          setHighlightedIndex(0);
        }}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 20,
            maxHeight: 250,
            overflowY: "auto",
          }}
        >
          {filtered.slice(0, limit).map((item, idx) => (
            <MenuItem
              key={item[valueKey]}
              selected={idx === highlightedIndex}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => {
                onChange(item[valueKey]);
                setOpen(false);
              }}
            >
              {item[displayKey]}
              {descriptionKey && ` - ${item[descriptionKey]}`}
            </MenuItem>
          ))}
          {filtered.length === 0 && (
            <MenuItem disabled>No results found</MenuItem>
          )}
        </Paper>
      )}
    </div>
  );
}
