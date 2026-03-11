/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': IonIconProps;
  }
}

interface IonIconProps {
  name?: string;
  class?: string;
  [key: string]: any;
}
