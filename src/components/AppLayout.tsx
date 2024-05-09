import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import PrayerList from "./PrayerList";
import CountrySelect from "./CountrySelect";
import { currentDay, currentMonth, currentYear } from "../utils/constants";
import useGeoLocation from "../hooks/useGeoLocation";
import Error from "./Error";
import { getFlagEmoji, getPrayerStatus } from "../utils/helpers";
import ColorSelect from "./ColorSelect";
import LangSelect from "./LangSelect";

const StyledMain = styled.main`
  width: 100%;
  padding-inline: 1.5rem;

  @media screen and (min-width: 576px) {
    width: 540px;
  }
  @media screen and (min-width: 767px) {
    width: 750px;
  }
  @media screen and (min-width: 991px) {
    width: 970px;
  }
  @media screen and (min-width: 1200px) and (max-width: 1350px) {
    width: 1170px;
  }
  @media screen and (min-width: 1351px) {
    width: 1300px;
  }
`;

const StyledStack = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: 1351px) {
    flex-direction: column;
  }
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 4rem;
  align-items: center;
  gap: 1.6rem;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

function AppLayout() {
  const [timings, setTimings] = useState({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [isTimingsLoading, setIsTimingsLoading] = useState(false);
  const [timingError, setTimingsError] = useState<string | null>(null);

  const { location, isLoading: isLocationLoading, error: locationError } = useGeoLocation();

  const [selectedCountry, setSelectedCountry] = useState({
    country: "",
    city: "",
    label: "",
  });

  const isLoading = isLocationLoading || isTimingsLoading;
  const isError = locationError || timingError;

  const { currentPrayer, nextPrayer } = getPrayerStatus(timings);

  const [isPrayerStarted, setIsPrayerStarted] = useState(false);

  useEffect(() => {
    setSelectedCountry({
      country: location.countryName,
      city: location.city,
      label: `${location.countryName} ${getFlagEmoji(location.countryCode)} | ${
        location.city
      }`,
    });
  }, [location]);

  useEffect(() => {
    async function getTimings<T>(): Promise<T | void> {
      if (!selectedCountry.city || !selectedCountry.country) return;

      setIsTimingsLoading(true);
      setIsPrayerStarted(false);

      try {
        const res = await fetch(
          `http://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${selectedCountry.city
            .split(" ")
            .join("")}&country=${selectedCountry.country}&method=5`
        );

        if (res.ok) {
          const data = await res.json();
          const { Fajr, Dhuhr, Asr, Maghrib, Isha, Sunrise } =
            data.data[currentDay - 1 || 0].timings;
          setTimings({
            Fajr: Fajr.slice(0, 5),
            Sunrise: Sunrise.slice(0, 5),
            Dhuhr: Dhuhr.slice(0, 5),
            Asr: Asr.slice(0, 5),
            Maghrib: Maghrib.slice(0, 5),
            Isha: Isha.slice(0, 5),
          });
          setIsTimingsLoading(false);
        }
      } catch (err) {
        setTimingsError("Error 'getTimings()' couldn't fetch timings");
        setIsTimingsLoading(false);
        console.error(err);
      } finally {
        setIsTimingsLoading(false);
      }
    }
    getTimings();
  }, [selectedCountry, isPrayerStarted]);

  if (isError)
    return (
      <div style={{ display: "flex", alignItems: "center", fontSize: "2rem" }}>
        <Error errorMessage="Something went wrong! Check your connection and reload again" />
      </div>
    );

  return (
    <StyledMain>
      <Header
        selectedCountry={selectedCountry}
        isLoading={isLoading}
        nextPrayer={nextPrayer}
        isPrayerStarted={isPrayerStarted}
        onPrayerStarted={setIsPrayerStarted}
      />

      <StyledStack>
        <PrayerList timings={timings} isLoading={isLoading} currentPrayer={currentPrayer} />
        <StyledSelectWrapper dir="ltr">
          <CountrySelect onSelect={setSelectedCountry} />
          <ColorSelect />
          <LangSelect />
        </StyledSelectWrapper>
      </StyledStack>
    </StyledMain>
  );
}

export default AppLayout;
