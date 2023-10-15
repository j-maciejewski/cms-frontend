'use client'

import { useEffect } from 'react'

export const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.innerHTML = `
      (function (d, s, id) {
        if (d.getElementById(id)) {
          if (window.__TOMORROW__) {
            window.__TOMORROW__.renderWidget();
          }
          return;
        }
        const fjs = d.getElementsByTagName(s)[0];
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
    
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'tomorrow-sdk');
    `

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="tomorrow"
      data-location-id="088293"
      data-language="EN"
      data-unit-system="METRIC"
      data-skin="light"
      data-widget-type="upcoming"
    ></div>
  )
}
