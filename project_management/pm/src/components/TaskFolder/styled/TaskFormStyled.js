import {TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { createTheme } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ descriptionInput }) => ({
  "& label": {
    color: "white",
  },
  "&:hover label": {
    fontWeight: 700,
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "white", // Input text color
      backgroundColor: "black", // Black background for input
      ...(descriptionInput && {
        minHeight: "150px", // Minimum height for description field
        height: "auto", // Set auto height if content grows
        width: "500px", // Set desired width
      }),
    },
  },
}));

  const StyledDatePicker = styled(DatePicker)({
    "& .MuiInputBase-root": {
      color: "white",  // Input text color
      backgroundColor: "black",  // Black background for input
    },
    "& .MuiSvgIcon-root": {
      color: "white"  ,// Color for the calendar icon
      backgroundColor: "black",  // Black background for input
  
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