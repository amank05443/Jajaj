import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import SortIcon from "@mui/icons-material/UnfoldMore";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

//themes pallette ::--
const themes = {
  White_Grey: {
    background: "#f9f9f9",
    headerBg: "#e0e0e0",
    rowBg: "#ffffff",
    rowAltBg: "f0f0f0",
    hoverBg: "#d3d3d3",
    textColor: "#000",
    borderColor: "#ccc",
  },
  Blue_Glass: {
    background: "rgba(220,240,255,0.7)",
    headerBg: "rgba(180,210,240,0.8)",
    rowBg: "rgba(240,250,255,0.6)",
    rowAltBg: "rgba(220,235,255,0.6)",
    hoverBg: "rgba(170,210,255,0.9)",
    textColor: "#003366",
    borderColor: "#aac",
  },
  Sunset_Mist: {
    background: "rgba(255,245,230,0.7)",
    headerBg: "rgba(255,220,200,0.9)",
    rowBg: "rgba(255,245,230,0.6)",
    rowAltBg: "rgba(255,230,210,0.6)",
    hoverBg: "rgba(255,200,170,0.8)",
    textColor: "#4b2e2e",
    borderColor: "#d4b49c",
  },
  Forest_Fog: {
    background: "rgba(240,255,245,0.7)",
    headerBg: "rgba(210,235,215,0.85)",
    rowBg: "rgba(240,255,245,0.6)",
    rowAltBg: "rgba(255,245,235,0.6)",
    hoverBg: "rgba(190,235,200,0.85)",
    textColor: "#1e3b2c",
    borderColor: "#aacccc",
  },
  Cool_Steel: {
    background: "#f9f9f9",
    headerBg: "rgba(215,225,235,0.95)",
    rowBg: "rgba(240,245,250,0.9)",
    rowAltBg: "rgba(225,235,240,0.9)",
    hoverBg: "rgba(190,210,230,0.85)",
    textColor: "#223344",
    borderColor: "#b0c4d4",
  },
  Electric_Lime: {
    background: "rgba(245,255,240,0.9)",
    headerBg: "rgba(225,255,210,0.95)",
    rowBg: "rgba(245,255,240,0.85)",
    rowAltBg: "rgba(235,250,230,0.85)",
    hoverBg: "rgba(200,255,180,0.9)",
    textColor: "#003300",
    borderColor: "#88cc88",
  },
  Nebula_Night: {
    background: "rgba(30,30,40,0.8)",
    headerBg: "rgba(50,50,70,0.85)",
    rowBg: "rgba(40,40,60,0.7)",
    rowAltBg: "rgba(45,45,65,0.7)",
    hoverBg: "rgba(70,70,100,0.85)",
    textColor: "#ccddee",
    borderColor: "#666688",
  },
  Dark: {
    background: "#1e1e1e",
    headerBg: "#2e2e2e",
    rowBg: "#333",
    rowAltBg: "#2a2a2a",
    hoverBg: "#444",
    textColor: "#f0f0f0",
    borderColor: "#555",
  },
};

//for custom styling of table cells
const StyledTableCell = styled(TableCell)(({ themeMode, pinned }) => ({
  border: `1px solid ${themes[themeMode].borderColor}`,
  color: themes[themeMode].textColor,
  verticalAlign: "middle",
  padding: "8px",
  fontFamily: '"Segoe UI","Roboto","Open Sans",sans-serif',
  transition:
    "background-color 300ms ease,color 300ms ease,border-color 300ms ease",
  background: pinned ? themes[themeMode].headerBg : "inherit",
  position: pinned ? "sticky" : "static",
  left: pinned ? 0 : undefined,
  zIndex: pinned ? 2 : 1,
}));


//for custom styling of table rows
const StyledTableRow = styled(TableRow)(({ themeMode, index }) => ({
  backgroundColor:
    index % 2 === 0 ? themes[themeMode].rowBg : themes[themeMode].rowAltBg,
  "&:hover": { backgroundColor: themes[themeMode].hoverBg },
}));


//for getting the depth of the group
const getMaxDepth = (node) =>
  !node.children ? 1 : 1 + Math.max(...node.children.map(getMaxDepth));

 //for flattening the header with actual field
const flattenColumns = (nodes) =>
  nodes.flatMap((node) =>
    node.children ? flattenColumns(node.children) : [node],
  );

// for making nested as well as normal heading
const buildHeaderRows = (nodes, depth = 0, maxDepth = 3) => {
  const rows = [];
  const fillRows = (cols, depth) => {
    if (!rows[depth]) rows[depth] = [];
    cols.forEach((col) => {
      if (col.children) {
        const colSpan = flattenColumns([col]).length;
        rows[depth].push({
          label: col.group,
          colSpan,
          rowSpan: 1,
          field: col.field,
          sortable: col.sortable,
        });
        fillRows(col.children, depth + 1);
      } else {
        rows[depth].push({
          label: col.headerName,
          colSpan: 1,
          rowSpan: maxDepth - depth,
          field: col.field,
          sortable: col.sortable,
        });
      }
    });
  };
  fillRows(nodes, 0);
  return rows;
};


//for getting the value in fields with depth i.e., dot operator fields
const getNestedValue = (obj, path) => {
  if (!path) return "";
  try {
    const value = path
      .split(".")
      .reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
    return value ?? "";
  } catch {
    return "";
  }
};


// the ---::: GRID FUNCTION :::---
const CustomGrid = ({
  columns,
  rowPerPage = "5",
  theme = "White_Grey",
  data,
  editable = false,
  heading = "",
  onSave,
}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [filterText, setFilterText] = useState({});
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
  const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });

  const allLeafColumns = useMemo(() => flattenColumns(columns), [columns]);
  const maxDepth = useMemo(() => getMaxDepth({ children: columns }), [columns]);
  const headerRows = useMemo(
    () => buildHeaderRows(columns, 0, maxDepth),
    [columns, maxDepth],
  );

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    setEditRow(row.id);
    setEditedData(row);
  };

  const handleSave = () => {
    if (onSave) onSave(editedData);
    setEditRow(null);
  };

  const handleFilterChange = (field, value) => {
    setFilterText((prev) => ({ ...prev, [field]: value }));
  };

  const handleSort = (field) => {
    if (!allLeafColumns.find((col) => col.field === field)?.sortable) {
      return;
    }
    setSortConfig((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    );
  };

  const filteredData = useMemo(() => {
    return data
      .filter((row) =>
        allLeafColumns.every((col) => {
          if (!col.filterable) return true;
          const value = getNestedValue(row, col.field).toString().toLowerCase();
          const filter = (filterText[col.field] ?? "").toString().toLowerCase();
          return (value ?? "").toString().toLowerCase().includes(filter);
        }),
      )
      .sort((a, b) => {
        if (!sortConfig.field) return 0;
        const aVal = (getNestedValue(a, sortConfig.field) ?? "")
          .toString()
          .toLowerCase();
        const bVal = (getNestedValue(b, sortConfig.field) ?? "")
          .toString()
          .toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, filterText, sortConfig, allLeafColumns]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);
  console.log("paginatedData",paginatedData);
  console.log("allLeafColumns",allLeafColumns);

  return (
    <Paper
      elevation={3}
      sx={{
        border: "2px solid #ddd",
        overflow: "hidden",
        margin: 4,
        p: 2,
        borderRadius: "11px",
        background: themes[selectedTheme].background,
        boxShadow: "0 4px 10 rgba(0,0,0,0.1)",
        transition:
          "background-color 800ms ease,color 800ms ease,border-color 800ms ease",
        fontFamily: '"Segoe UI","Roboto","Open Sans",sans-serif',
      }}
    >
      <FormControl
        variant="outlined"
        size="small"
        style={{ float: "right", marginBottom: 15 }}
      >
        <InputLabel
          sx={{
            color: themes[selectedTheme].textColor,
            "&.Mui-focused": { color: themes[selectedTheme].textColor },
          }}
        >
          Theme
        </InputLabel>
        <Select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          label="Theme"
          sx={{
            color: themes[selectedTheme].textColor,
            "&.MuiOutlinedInput-root": {
              "& fieldset": { borderColor: themes[selectedTheme].textColor },
              "&:hover fieldset": {
                borderColor: themes[selectedTheme].textColor,
              },
              "&.Mui-focused fieldset": {
                borderColor: themes[selectedTheme].textColor,
              },
            },
            ".MuiSvgIcon-root": { color: themes[theme].textColor },
          }}
        >
          {Object.keys(themes).map((k) => (
            <MenuItem key={k} value={k}>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  marginRight: 8,
                  backgroundColor: themes[k].headerBg,
                  border: "1px solid #888",
                }}
              />
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {heading && (
        <h2
          style={{
            color: themes[selectedTheme].textColor,
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: 600,
            marginBottom: 15,
            fontFamily: '"Segoe UI","Roboto","Open Sans",sans-serif',
          }}
        >
          {heading}
        </h2>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            {headerRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{ background: themes[selectedTheme].headerBg }}
              >
                {row.map((cell, i) => (
                  <StyledTableCell
                    key={i}
                    sx={{textAlign:'center'}}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    themeMode={selectedTheme}
                    onClick={
                      !cell.children && cell.sortable
                        ? (e) => {
                            handleSort(cell.field);
                          }
                        : undefined
                    }
                    style={{
                      cursor: cell.sortable ? "pointer" : "default",
                      width: cell.width || "auto",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {cell.label}
                    {cell.sortable &&
                      sortConfig.field === cell.field &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </StyledTableCell>
                ))}
                {editable && rowIndex === 0 && (
                  <StyledTableCell themeMode={selectedTheme} rowSpan={maxDepth}>
                    Actions
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableHead>
          {allLeafColumns.some((col) => col.filterable) && (
            <TableHead>
              <TableRow>
                {allLeafColumns.map((col) => (
                  <StyledTableCell
                    key={col.field}
                    themeMode={selectedTheme}
                    pinned={col.pinned}
                    style={{
                      width: col.width || 120,
                      position: col.pinned ? "sticky" : undefined,
                      left: col.pinned ? 0 : undefined,
                    }}
                  >
                    {col.filterable && (
                      <TextField
                        size="small"
                        variant="outlined"
                        value={filterText[col.field] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.field, e.target.value)
                        }
                        placeholder="Search..."
                        sx={{
                          width: "100%",
                          fontSize: "0.85rem",
                          input: {
                            fontFamily:
                              '"Segoe UI","Roboto","Open Sans",sans-serif',
                            fontSize: "0.85rem",
                          },
                        }}
                        InputProps={{
                          sx: { color: themes[selectedTheme].textColor },
                        }}
                      />
                    )}
                  </StyledTableCell>
                ))}
                {editable && (
                  <StyledTableCell themeMode={selectedTheme}></StyledTableCell>
                )}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {paginatedData.map((row, i) => (
              <StyledTableRow
                key={row.id || i}
                index={i}
                themeMode={selectedTheme}
              >
                {allLeafColumns.map((col) => (
                  <StyledTableCell
                    key={col.field}
                    themeMode={selectedTheme}
                    style={{ width: col.width || 120}} sx={{textAlign:col.textAlignment ? col.textAlignment : "center"}}
                  >
                    {editRow === row.id ? (
                      <TextField
                        size="small"
                        value={editedData[col.field] ?? ""}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            [col.field]: e.target.value,
                          })
                        }
                      />
                    ) : getNestedValue(row, col.field) !== null &&
                      getNestedValue(row, col.field) !== undefined &&
                      getNestedValue(row, col.field) !== "" ? (
                      getNestedValue(row, col.field)
                    ) : (
                      "NA"
                    )}
                  </StyledTableCell>
                ))}
                {editable && (
                  <StyledTableCell themeMode={selectedTheme}>
                    {editRow === row.id ? (
                      <IconButton onClick={handleSave}>
                        {" "}
                        <SaveIcon />{" "}
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(row)}>
                        {" "}
                        <EditIcon />{" "}
                      </IconButton>
                    )}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: themes[selectedTheme].textColor }}
      />
    </Paper>
  );
};

export default CustomGrid;
