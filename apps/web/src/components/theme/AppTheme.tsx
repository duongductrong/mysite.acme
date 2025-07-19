import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedbacks";
import { inputsCustomizations } from "./customizations/inputs";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./customizations";

const themeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

export default function AppTheme({
  children,
  disableCustomTheme,
}: AppThemeProps) {
  const emotionCache = createCache({ key: "css" });

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
