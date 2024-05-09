import styled from "styled-components";

import Timer from "./Timer";
import Spinner from "./Spinner";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
import { formatDateTime } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import transEn from "../locale/en.json";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem 1rem;
  position: relative;
  min-height: 145px;

  border-bottom: 1px solid var(--border-clr);

  @media screen and (max-width: 991px) {
    text-align: center;
  }
`;

const StyledP = styled.p`
  font-size: clamp(1.5rem, 3vmin, 2.2rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-clr);
`;
const StyledH1 = styled.h1`
  font-size: clamp(2.5rem, 4vmin, 4.5rem);
`;

const StyledStack = styled.div`
  color: var(--text-clr);
`;

interface SelectedCountry {
  country: string;
  city: string;
  label: string;
}

type NextPrayer = {
  name: string;
  time: number;
};

function Header({
  selectedCountry,
  isLoading,
  nextPrayer = {},
  onPrayerStarted,
}: {
  selectedCountry: SelectedCountry;
  isLoading: boolean;
  nextPrayer: NextPrayer;
  onPrayerStarted: Dispatch<SetStateAction<boolean>>;
  isPrayerStarted: boolean;
}) {
  const { label } = selectedCountry;
  const { name, time } = nextPrayer;
  const [currentDate, setCurrentDate] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentDate(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  return (
    <StyledHeader>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="55px" color="#3498db" />
        </div>
      ) : (
        <>
          <StyledStack>
            <StyledP>{currentDate}</StyledP>
            <StyledH1>
              <span>{label}</span>
            </StyledH1>
          </StyledStack>

          {name ? (
            <StyledStack>
              <StyledP>
                {t("header.timer.nextPrayer")} "{t(`prayerNames.${name}`)}"
              </StyledP>

              <StyledH1>
                <Timer
                  duration={time}
                  callback={() => onPrayerStarted(true)}
                  prayerName={name}
                  refreshTime={10000}
                />
              </StyledH1>
            </StyledStack>
          ) : (
            <StyledP>{t("header.timer.done")}</StyledP>
          )}
        </>
      )}
    </StyledHeader>
  );
}

export default Header;
