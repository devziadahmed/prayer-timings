import { createGlobalStyle } from "styled-components";

interface GlobalStylesProps {
  bgColor: string;
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
    :root {
        --bg-clr: ${({ bgColor }) => bgColor};
        --text-clr: white;
        --border-clr: rgba(255, 255, 255, 0.3);
        --card-bg-clr: white;
        --card-text-clr: #555;
        --card-hover: ${({ bgColor }) => bgColor};
        --card-active: #0abf53;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        transition: background-color 0.3s, border 0.3s;
    }

    *:disabled {
        cursor: not-allowed;
    }

    html {
        font-size: 62.5%;

    }

    #root {
        min-height: 100vh;
        padding-block: 1.5rem;
        display: flex;
        justify-content: center;

        padding-block: clamp(3rem,10vmin, 10rem) 3rem;


        line-height: 1.5;
        font-size: 1.6rem;
        font-family: "IBM Plex Sans Arabic", sans-serif;

        background-color: var(--bg-clr);

        overflow: auto;
    }

    img {
        max-width: 100%;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    overflow-wrap: break-word;
    }

`;

export default GlobalStyles;
