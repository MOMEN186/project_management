import {TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { createTheme } from '@mui/material/styles';
const fontColor = "#a4c0cc";
const bg = "#1d2025";

const StyledTextField = styled(TextField)(({ descriptionInput }) => ({
  "& label": {
    color: fontColor, // Label color
  },
  "& .MuiInputLabel-root .MuiInputRoot": {
    color: fontColor, // Ensure label is correct color by default
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
    color: fontColor, // Label color when focused or shrunk (floating)
    transform: "translate(14px, -6px) scale(0.75)", // Floating label position
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: fontColor, // Default border color
      color: fontColor,
    },
    "&:hover fieldset": {
      borderColor: fontColor, // Hover border color
      borderWidth: 2, // Slightly thicker border on hover
      color: fontColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: fontColor, // Focused border color
      color: fontColor,
    },
    "& .MuiInputBase-input": {
      color: fontColor, // Input text color
      backgroundColor: bg, // Background color for input
      ...(descriptionInput && {
        minHeight: "150px",
        height: "auto",
        width: "500px",
      }),
    },
  },
  "& .MuiInput-root": {
    color: fontColor,
    fontFamily: "Arial",
    "&:before": {
      borderColor: fontColor,
      borderWidth: "1px",
    },
    "&:after": {
      borderWidth: "3px",
    },
    ":hover:not(.Mui-focused)": {
      "&:before": {
        borderWidth: "2px",
      },
    },
  },
}));

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-root": {
    color: fontColor,
    backgroundColor: bg,
    width: "350px",
    paddingRight: "0px",
  },
  "& .MuiInputAdornment-root": {
    position: "end",
    marginRight: "15px",
  },
  "& .MuiSvgIcon-root": {
    color: fontColor,
    backgroundColor: bg,
  },
  "& .MuiPickersPopper-root": {
    width: "350px",
  },
});

// Custom Icon Button for Date Picker
const StyledButton = styled(IconButton)({
  color: fontColor,
  backgroundColor: bg,
  borderRadius: "1px",
});

// Day Component Styles
const StyledDay = styled(PickersDay)({
  backgroundColor: bg,
  color: fontColor,
  border:"none",
  "&:hover": {
    backgroundColor: fontColor,
    color: bg,
  },
  "&.Mui-selected": {
    backgroundColor: fontColor,
    color: bg,
    "&:hover": {
      backgroundColor: fontColor,
      color: bg,
    },
    "&:focus": {
      backgroundColor: fontColor,
      color: bg,
    },
  },
});

// Theme Overrides for Calendar Components
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: bg,
    },
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: bg,
          color: fontColor,
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: bg,
          color: fontColor,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: bg,
          color: fontColor,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: bg,
          color: fontColor,
        },
        label: {
          color: fontColor,
        },
        switchViewButton: {
          color: fontColor,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: fontColor,
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: fontColor,
          backgroundColor: bg,
        },
      },
    },
  },
});



  export {theme,StyledButton,StyledDay,StyledDatePicker,StyledTextField}

