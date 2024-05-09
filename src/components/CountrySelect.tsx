import Select from "react-select";

import Spinner from "./Spinner";
import useGroupedCountries from "../hooks/useGroupedCountries";
import Error from "./Error";
import { useTranslation } from "react-i18next";

export const customSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: "270px",
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

function CountrySelect({ onSelect }) {
  const [groupedCountries, isLoading, error] = useGroupedCountries();
  const { t } = useTranslation();

  if (isLoading) return <Spinner size="35px" color="#3498db" />;

  if (error) return <Error errorMessage={error} />;

  return (
    <>
      <Select
        styles={customSelectStyles}
        placeholder={t(`select.countrySelect`)}
        options={groupedCountries}
        onChange={(selectedCountry) => {
          const flag = selectedCountry?.label?.match(/[\p{Emoji}\u200d]+/gu) || "";
          const name =
            selectedCountry?.label?.slice(0, selectedCountry?.label?.indexOf(flag)) || "";

          onSelect({
            country: selectedCountry?.value,
            city: selectedCountry?.capital || "",
            label: `${name}${flag} | ${selectedCountry?.capital}`,
          });
        }}
      />
    </>
  );
}

export default CountrySelect;
