import { Brand } from 'type/viewModel/common/brand';
import { getInitialCharacter } from 'utils/initialCharacter';

type BrandStartWithAlphabet = {
  initialCharacter: string;
  data: {
    id: string;
    name: string;
    imageUrl: string | undefined;
  }[];
};

type BrandStartWithOther = {
  initialCharacter: string;
  data: {
    id: string;
    name: string;
    imageUrl: string | undefined;
  }[];
};

export const getBrandsWithInitial = (
  brands: Brand[]
): {
  initialCharacter: string;
  data: {
    id: string;
    name: string;
    imageUrl: string | undefined;
  }[];
}[] => {
  const brandsStartWithAlphabetList: BrandStartWithAlphabet[] = [];
  const brandsStartWithOther: BrandStartWithOther = {
    initialCharacter: 'その他',
    data: [],
  };
  const initialCharacters: string[] = [];

  brands.forEach((brand) => {
    const initial = getInitialCharacter(brand.name);
    if (!initial) {
      brandsStartWithOther.data.push(brand);
      return;
    }

    const index = initialCharacters.indexOf(initial);
    if (brandsStartWithAlphabetList[index]) {
      brandsStartWithAlphabetList[index].data.push(brand);
    } else {
      initialCharacters.push(initial);
      brandsStartWithAlphabetList.push({
        initialCharacter: initial,
        data: [brand],
      });
    }
  });

  if (brandsStartWithOther.data.length > 0) {
    return [...brandsStartWithAlphabetList, brandsStartWithOther];
  } else {
    return brandsStartWithAlphabetList;
  }
};
