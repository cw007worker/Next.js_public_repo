import { useMemo, useEffect } from 'react';
import router from 'next/router';
import { findBrand, BrandConst } from 'constants/brands';

type PickUpProduct = {
  name: string;
  imagePath: string;
};

export type HookState = {
  pickupBrands: BrandConst[];
  pickupProducts: PickUpProduct[];
};

export const useOnboardingPage = (): HookState => {
  const pickupProducts: PickUpProduct[] = [
    {
      name: 'BalenciagaFragmentCase',
      imagePath: '/Onboarding/PickupProducts/BalenciagaFragmentCase.png',
    },
    {
      name: 'IpsaTimeAqure',
      imagePath: '/Onboarding/PickupProducts/IpsaTimeAqure.png',
    },
    {
      name: 'GucciWestBag',
      imagePath: '/Onboarding/PickupProducts/GucciWestBag.png',
    },
    {
      name: 'DiorEyePalette',
      imagePath: '/Onboarding/PickupProducts/DiorEyePalette.png',
    },
  ];

  const pickupBrands = [
    findBrand('rom&nd'),
    findBrand('BOBBI BROWN'),
    findBrand('JILLSTUART'),
    findBrand('CLINIQUE'),
    findBrand('DIOR'),
    findBrand('CLARINS'),
    findBrand('CHANEL'),
    findBrand('CNP Laboratory'),
  ];

  return {
    pickupBrands,
    pickupProducts,
  };
};
