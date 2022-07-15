import Script from 'next/script';
import React from 'react';

export type GoogleTagManagerId = `GTM-${string}`;

type Props = {
  googleTagManagerId: GoogleTagManagerId;
};

const GoogleTagManagerNoScript: React.FC<Props> = ({ googleTagManagerId }) => (
  <React.Fragment>
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        />`,
      }}
    />
  </React.Fragment>
);

export default GoogleTagManagerNoScript;
