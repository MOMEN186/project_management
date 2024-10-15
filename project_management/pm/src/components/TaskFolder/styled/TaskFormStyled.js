import {TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { createTheme } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ descriptionInput }) => ({
  "& label": {
    color: "white", // Default label color
  },
  "& .MuiInputLabel-root": {
    color: "white", // Ensure label is white by default
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
    color: "white", // Keep label white when focused or shrunk (floating)
    transform: "translate(14px, -6px) scale(0.75)", // Adjust for floating position
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Hover border color
      borderWidth: 2, // Slightly thicker border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Focus border color remains white
    },
    "& .MuiInputBase-input": {
      color: "white", // Input text color remains white
      backgroundColor: "black", // Black background for the input
      ...(descriptionInput && {
        minHeight: "150px", // Minimum height for description field
        height: "auto", // Auto height for content expansion
        width: "500px", // Set desired width for description field
      }),
    },
  },
}));

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-root": {
    color: "white",  // Input text color
    backgroundColor: "black",  // Black background for input
    width: "350px",  // Set width of the date picker input
    paddingRight: "0px",  // Remove extra padding to ensure icon is placed right at the edge
  },
  "& .MuiInputAdornment-root": {
    position: "end",  // Aligns the icon at the end of the input
    marginRight: "15px",  // No additional right margin
  },
  "& .MuiSvgIcon-root": {
    color: "white",  // Color for the calendar icon
    backgroundColor: "black",  // Black background for input
  },
  "& .MuiPickersPopper-root": {
    width: "350px",  // Ensure consistent width for the calendar pop-up dialog
  },
});


  
  
  const StyledButton = styled(IconButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    color: "white",
     backgroundColor: "black",
  
  }));



  const StyledDay = styled(PickersDay)(({ theme }) => ({
    backgroundColor: "black",  // Calendar day background color
    color: "white",  // Calendar day text color
    "&:hover": {
      backgroundColor: "white",  // Hover state for days
      color: "black"
    },
    "&.Mui-selected": {
      backgroundColor: "white",  // Selected day background color
      color: "black",  // Selected day text color
      "&:hover": {
        backgroundColor: "white",  // Ensure hover doesn't change the selected day
        color: "black"
      },
      "&:focus": {
        backgroundColor: "white",  // Ensure focus doesn't change the selected day
        color: "black"
      }
    },
  }));

  
  const theme = createTheme({
    palette: {
      mode: 'dark', // This globally enables dark mode
      backgroundColor:"black"
    },
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            backgroundColor: "black", // Days background
            color: "white", // Days text color
          },
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            backgroundColor: "black", // Entire calendar background
            color: "white",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: "black", // Calendar dialog background
            color: "white", // Text color inside dialog
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            backgroundColor: "black", // Calendar header background
            color: "white", // Header text color
          },
          label: {
            backgroundColor: "black",
            color: "white", // Month label color
          },
          switchViewButton: {
            color: "white", // View switcher (month/year view toggle) color
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            backgroundColor:"black",
            color: "white",  // Previous and next month icon color
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: 'black',
        }
      }
    }
  });



  export {theme,StyledButton,StyledDay,StyledDatePicker,StyledTextField}