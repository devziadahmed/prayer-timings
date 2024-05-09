import { colorOptions, ColorOption } from "../utils/theme";
import Select, { StylesConfig } from "react-select";
import { useColor } from "../context/ColorContext";

const colourStyles: StylesConfig<ColorOption> = {
  control: (styles, { selectProps: { value } }) => ({
    ...styles,
    width: "270px",
    backgroundColor: "white",
    borderColor: "white", // Set border color to the value's color, if value exists
    borderWidth: "1px",
    boxShadow: "none",
    padding: ".5rem 1rem",
    ":hover": {
      borderColor: value ? value.value : "white", // Set hover border color to the value's color, if value exists
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.value
        : isFocused
        ? "#eee"
        : undefined,
      color: isSelected ? "white" : data.value,
      cursor: isDisabled ? "not-allowed" : "default",
      fontWeight: "bold",
    };
  },
  singleValue: (styles, { data }) => ({
    ...styles,
    color: data.value,
    fontWeight: "600",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "#999",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "black",
  }),
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export default function ColorSelect() {
  const { color, setColor } = useColor();
  const storedColor = colorOptions.find((storedColor) => storedColor.value === color);

  return (
    <Select
      value={storedColor}
      options={colorOptions}
      styles={colourStyles}
      onChange={(colorValue) => setColor(colorValue.value)}
    />
  );
}
