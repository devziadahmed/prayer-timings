import { JSX } from "react";
import styled, { keyframes } from "styled-components";
import { convertTo12HourFormat } from "../utils/helpers";
import Spinner from "./Spinner";

const StyledCard = styled.div`
  background-color: var(--card-bg-clr);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  &:hover p,
  &:hover h2 {
    color: var(--card-hover);
  }
`;

const StyledImg = styled.img`
  height: 160px;
  width: 100%;
  object-fit: cover;
`;

const pulseActive = keyframes`
  100% {
    color: var(--card-active)
  }
`;

const StyledTitle = styled.h2`
  color: var(--card-text-clr);
  transition: 0.3s;
  animation: ${({ active }) => (active === "true" ? pulseActive : "none")} 0.7s infinite
    alternate;
`;

const StyledP = styled.p`
  color: var(--card-text-clr);
  font-size: 7rem;
  font-weight: 200;
  transition: 0.3s;
  padding-inline: 0.3rem;
`;

const StyledSpan = styled.span`
  display: block;
  color: var(--card-hover);
  font-weight: 700;
`;

const StyledContent = styled.div`
  padding: 1.5rem;
`;

interface PrayerCardProps {
  imgSrc: string;
  title: string;
  timing?: string;
  isLoading: boolean;
  active?: string;
  currentPrayer: boolean | string;
}

type Time = [string, string];

function PrayerCard({
  imgSrc,
  title,
  timing,
  isLoading,
  currentPrayer,
}: PrayerCardProps): JSX.Element {
  if (!imgSrc || !title) return <StyledCard>All props are requried</StyledCard>;

  const timing12 = timing ? convertTo12HourFormat(timing) : "00:00 AM";
  const [time, meridiem]: Time = timing ? timing12.split(" ") : ["", ""];

  return (
    <StyledCard>
      <StyledImg src={imgSrc} alt={title} />

      <StyledContent>
        <StyledTitle active={currentPrayer}>{title}</StyledTitle>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <Spinner size="50px" color="#3498db" />
          </div>
        ) : (
          <div>
            <StyledP>{time}</StyledP>
            <StyledSpan>{meridiem}</StyledSpan>
          </div>
        )}
      </StyledContent>
    </StyledCard>
  );
}

export default PrayerCard;
