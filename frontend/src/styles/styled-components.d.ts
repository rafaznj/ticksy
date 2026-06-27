import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      white: string;
      black: string;
      gray: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      blackAlpha: {
        5: string;
        10: string;
        30: string;
      };
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      red: string;
      lightRed: string;
      orange: string;
      yellow: string;
      green: string;
      teal: string;
      cyan: string;
      lightOrange: string;
      lightBlue: string;
      dullBlue: string;
      navyDeep: string;
      primary: string;
      primaryHover: string;
      primaryLight: string;
      secondary: string;
      secondaryHover: string;
      success: string;
      info: string;
      lightInfo: string;
      warning: string;
      danger: string;
      darkDanger: string;
      danderHover: string;
      lightDanger: string;
      light: string;
      dark: string;
      darkGray: string;
      lightGray: string;
      $mode: string;
      grayPink: string;
      body: {
        bodyBg: string;
        bodyColor: string;
      };
      links: {
        linkColor: string;
      };
      shadowGray: string;
      informativeBlue: string;
      table: {
        hover: string;
        odd: string;
        buttonEdit: string;
      };
      active: string;
      inactive: string;
      setup: string;
      maintenance: string;
      unsensed: string;
      lightActive: string;
      lightDeactive: string;
      lightBlueGray: string;
      darkBlue: string;
      whiteSmoke: string;
    };
    spacers: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };
    borders: {
      radius: {
        none: string;
        sm: string;
        md: string;
        lmd: string;
        lg: string;
        round: string;
      };
      width: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    gridBreakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    containerMaxWidths: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fonts: {
      family: {
        familyBase: string;
        familyHeading: string;
      };
      size: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      weight: {
        100: number;
        200: number;
        300: number;
        400: number;
        500: number;
        600: number;
        700: number;
        800: number;
        900: number;
      };
      lineHeight: {
        1.0: number;
        1.1: number;
        1.2: number;
        1.3: number;
        1.4: number;
        1.5: number;
        1.6: number;
        1.7: number;
        1.8: number;
        1.9: number;
        2.0: number;
      };
    };
    components: {
      h1: {
        size: string;
      };
      h2: {
        size: string;
      };
      h3: {
        size: string;
      };
      h4: {
        size: string;
      };
      h5: {
        size: string;
      };
      h6: {
        size: string;
      };
      input: {
        height: string;
        labelHeight: string;
      };
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
