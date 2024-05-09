import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./components/AppLayout";
import { useColor } from "./context/ColorContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { color } = useColor();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
    document.documentElement.setAttribute("dir", i18n.dir());
  }, [i18n]);

  return (
    <>
      <GlobalStyles bgColor={color} />
      <AppLayout />
    </>
  );
}

export default App;
