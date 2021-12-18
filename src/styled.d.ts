import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
      textColor : string,
      accentColor : string,
      btnColor : string,
      bgDefaultColor : string,
      bgSecondaryColor : string,
      borderColor : string,
      borderAccentColor? : string,
      actionColor? : string,
      inActionColor? : string
  }
}