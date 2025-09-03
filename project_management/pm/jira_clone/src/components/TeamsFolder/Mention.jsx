import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../controllers/TeamsController";
import { cookiesContext } from "../../../../src/App";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import useAutocomplete from "@mui/material/useAutocomplete";

const Root = styled("div")(
  ({ theme }) => `
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    font-size: 14px;
  `
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === "dark" ? "white" : "white"};
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === "dark" ? "white" : "white"};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === "dark" ? "white" : "white"};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === "dark" ? "white" : "white"
    };
    border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === "dark" ? "white" : "white"};
      background-color: ${
        theme.palette.mode === "dark" ? "white" : "white"
      };
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
      };
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
);

export default function Mention({ teamDetails, setTeamDetails }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user") || "");
  const [token] = useState(user.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const result = await getAllUsers(teamDetails.id, token);
      console.log("all users in mention", result);
       setUsers(Array.isArray(result) ? result : []);
    }

    fetchUsers();
  }, []);

  const handleAddUsers = (newUser) => {
    setTeamDetails({ ...teamDetails, participants: newUser });
    console.log(teamDetails);
  };

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    // defaultValue: [teamDetails.participants],
    multiple: true,
    options: users,
    getOptionLabel: (option) => option?.first_name,
  });

  useEffect(() => {
    if (value.length > 0) {
      handleAddUsers(value);
    }
  }, [value]);

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>add team members </Label>

        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <StyledTag key={key} {...tagProps} label={option.first_name} />
            );
          })}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions?.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                <span>{option.first_name}</span>
                <CheckIcon fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}
