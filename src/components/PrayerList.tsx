import { JSX } from "react";
import styled from "styled-components";
import PrayerCard from "./PrayerCard";
import { useTranslation } from "react-i18next";

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  gap: 1.5rem;
  margin-block-start: 4rem;
`;

interface Timings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

function PrayerList({
  timings,
  isLoading,
  currentPrayer,
}: {
  timings: Timings;
  isLoading: boolean;
  currentPrayer: { name: string };
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <StyledCardWrapper>
      <PrayerCard
        imgSrc="./fajr-prayer.png"
        title={t(`prayerNames.Fajr`)}
        timing={timings.Fajr}
        isLoading={isLoading}
        currentPrayer={currentPrayer.name === "Fajr" ? "true" : ""}
      />
      <PrayerCard
        imgSrc="./dhhr-prayer-mosque.png"
        title={t(`prayerNames.Dhuhr`)}
        timing={timings.Dhuhr}
        isLoading={isLoading}
        currentPrayer={currentPrayer.name === "Dhuhr" ? "true" : ""}
      />
      <PrayerCard
        imgSrc="./asr-prayer-mosque.png"
        title={t(`prayerNames.Asr`)}
        timing={timings.Asr}
        isLoading={isLoading}
        currentPrayer={currentPrayer.name === "Asr" ? "true" : ""}
      />
      <PrayerCard
        imgSrc="./sunset-prayer-mosque.png"
        title={t(`prayerNames.Maghrib`)}
        timing={timings.Maghrib}
        isLoading={isLoading}
        currentPrayer={currentPrayer.name === "Maghrib" ? "true" : ""}
      />
      <PrayerCard
        imgSrc="./night-prayer-mosque.png"
        title={t(`prayerNames.Isha`)}
        timing={timings.Isha}
        isLoading={isLoading}
        currentPrayer={currentPrayer.name === "Isha" ? "true" : ""}
      />
    </StyledCardWrapper>
  );
}

export default PrayerList;
