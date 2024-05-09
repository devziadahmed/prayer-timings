import Select from "react-select";

import { langs } from "../utils/constants";
import { useTranslation } from "react-i18next";

export const customSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: "150px",
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "white" : "white",
    borderWidth: "1px",
    boxShadow: "none",
    padding: ".5rem 1rem",
    ":hover": {
      borderColor: state.isFocused && "white",
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    width: "100%",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    ":hover": {
      backgroundColor: "#eee",
    },
    backgroundColor: state.isSelected && "#0087d2",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,

    color: "white",
    fontWeight: "600",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
  }),
  groupHeading: (baseStyles, state) => ({
    ...baseStyles,
    color: "#3498db",
    fontWeight: "bold",
  }),
  indicatorSeparator: (baseStyles, state) => ({
    display: "none",
  }),
};

function LangSelect() {
  const { i18n } = useTranslation();

  function changeLanguage(selectedLanguage) {
    i18n.changeLanguage(selectedLanguage.value);
    localStorage.setItem("lang", selectedLanguage.value);
  }

  const storedLang = localStorage.getItem("lang");

  return (
    <>
      <Select
        styles={customSelectStyles}
        options={langs}
        defaultValue={{ value: storedLang || "en", label: storedLang || "en" }}
        onChange={changeLanguage}
      />
    </>
  );
}

export default LangSelect;
