import { useEffect, useState } from "react";
import { getFlagEmoji } from "../utils/helpers";

interface Country {
  value: string;
  label: string;
}

interface CountryGroup {
  label: string;
  options: Country[];
}

function useGroupedCountries(): [CountryGroup[], boolean, string | null] {
  const [countriesByContinent, setCountriesByContinent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      setIsLoading(true);

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countriesByContinent: Record<string, Country[]> = {};
        data.forEach((country: Country) => {
          const continent = country.region;
          if (!countriesByContinent[continent]) {
            countriesByContinent[continent] = [];
          }
          countriesByContinent[continent].push({
            name: country.name.common,
            capital: country.capital?.[0] || "",
            iso: country.cca2,
          });
        });

        setCountriesByContinent(countriesByContinent);
        setError("");
      } catch (error) {
        setError("Error fetching countries");
        return {};
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  function generateCoutriesArray(continent: string): Country[] {
    const formatedCountries = countriesByContinent?.[continent]?.map((country) => {
      return {
        value: country.name,
        label: `${country.name} ${getFlagEmoji(country.iso)}`,
        capital: country.capital,
      };
    });
    return formatedCountries;
  }

  const africaCountries = generateCoutriesArray("Africa");
  const americasCountries = generateCoutriesArray("Americas");
  const antarcticCountries = generateCoutriesArray("Antarctic");
  const asiaCountries = generateCoutriesArray("Asia");
  const europeCountries = generateCoutriesArray("Europe");
  const oceaniaCountries = generateCoutriesArray("Oceania");

  const groupedCountries: CountryGroup[] = [
    { label: "Africa", options: africaCountries },
    { label: "Americas", options: americasCountries },
    { label: "Antarctic", options: antarcticCountries },
    { label: "Asia", options: asiaCountries },
    { label: "Europe", options: europeCountries },
    { label: "Oceania", options: oceaniaCountries },
  ];

  return [groupedCountries, isLoading, error];
}

export default useGroupedCountries;
