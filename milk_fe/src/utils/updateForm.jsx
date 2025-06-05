import { Box, MenuItem, TextField } from "@mui/material";

export const InfoRow = ({ icon, label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 1,
      borderBottom: "1px solid #eee",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>{icon}</Box>
    <Box sx={{ width: 150, color: "#555", fontWeight: 500, mb: 1.5 }}>
      {label}
    </Box>
    <Box sx={{ mb: 1.5 }}>{value}</Box>
  </Box>
);

export const InputRow = ({
  icon,
  label,
  name,
  value,
  onChange,
  error,
  helperText,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 1,
      borderBottom: "1px solid #eee",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>{icon}</Box>
    <Box sx={{ width: 150, color: "#555", fontWeight: 500, mb: 1.5 }}>
      {label}
    </Box>
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
      sx={{ mb: 1.5 }}
      error={error}
      helperText={helperText}
    />
  </Box>
);

export const InputSelectRow = ({
  icon,
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 1,
      borderBottom: "1px solid #eee",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>{icon}</Box>
    <Box sx={{ width: 150, color: "#555", fontWeight: 500, mb: 1.5 }}>
      {label}
    </Box>
    <TextField
      name={name}
      select
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ mb: 1.5 }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);
