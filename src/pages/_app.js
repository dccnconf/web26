import '../styles/tailwind.css';
import 'katex/dist/katex.min.css';

import {config, library} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React from "react";
import {faDesktop, faNetworkWired, faWaveSquare} from "@fortawesome/free-solid-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons"; // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(faNetworkWired, faWaveSquare, faDesktop, faYoutube);


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
