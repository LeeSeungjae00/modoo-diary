"use client";
// styles/GlobalStyles.js

import { Global, css } from "@emotion/react";
import localFont from "next/font/local";

// 폰트 정의
const chilgokFont = localFont({
  src: "../../public/static/fonts/Together-KwonJungae.woff2",
});

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        --diary-font: ${chilgokFont.style.fontFamily};
      }
    `}
  />
);

export default GlobalStyles;
