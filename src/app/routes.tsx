import { useEffect } from 'react';
import { createHashRouter } from 'react-router';
import { SpotlightLayout } from './components/SpotlightLayout';
import { SpotlightPageCOH } from './pages/SpotlightPageCOH';

const CITY_OF_HOPE_URL = 'https://cityofhope.oneamyloidosisvoice.com/';

function CityOfHopeRedirect() {
  useEffect(() => {
    window.location.replace(CITY_OF_HOPE_URL);
  }, []);

  return null;
}

export const router = createHashRouter([
  {
    path: '/spotlight/coh/v1',
    Component: CityOfHopeRedirect,
  },
  // City of Hope custom domain root.
  {
    path: '/',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageCOH }],
  },
]);
