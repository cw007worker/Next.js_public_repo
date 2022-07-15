import { Heading, Flex } from '@chakra-ui/react';
import { Description } from 'components/organisms/Description';
import React, { Fragment, VFC } from 'react';
import { Recommendations } from 'components/organisms/Recommendations';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { HookState } from 'hooks/pages/useProductDetailPage';
import { Button } from 'components/atoms/Button';
import { UnitInfoWithAll } from 'components/organisms/UnitInfoWithAll';
import { UnitInfoWithDefault } from 'components/organisms/UnitInfoWithDefault';
import { UnitInfoWithSizes } from 'components/organisms/UnitInfoWithSizes';
import { UnitInfoWithVarieties } from 'components/organisms/UnitInfoWithVarieties';
import { Loading } from 'components/molecules/Loading';
import { ProducteDetailSkeleton } from 'components/organisms/Skeleton/productDetail';

const Component: VFC<HookState> = (props) => {
  return (
    <Fragment>
      {props.pageState === undefined || props.pageState.type === 'loading' ? (
        <ProducteDetailSkeleton />
      ) : props.pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="エラーが発生しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : props.pageState.type === 'loaded' ? (
        <Fragment>
          {/* @see https://zenn.dev/terrierscript/books/2021-05-chakra-ui/viewer/1-7-1-expand-box */}
          {/* unitが4つの状態を持ち、それぞれ異なるhooksを持つためにコンポーネントごと分けた。共通するコードが多いがこれが一番複雑にならないかと思った。 */}
          {props.pageState.data.tag === 'all' ? (
            <UnitInfoWithAll
              {...props.pageState.data}
              {...props.swiper}
              membershipGrade={props.membershipGrade}
            />
          ) : props.pageState.data.tag === 'default' ? (
            <UnitInfoWithDefault
              {...props.pageState.data}
              {...props.swiper}
              membershipGrade={props.membershipGrade}
            />
          ) : props.pageState.data.tag === 'sizes' ? (
            <UnitInfoWithSizes
              {...props.pageState.data}
              {...props.swiper}
              membershipGrade={props.membershipGrade}
            />
          ) : props.pageState.data.tag === 'varieties' ? (
            <UnitInfoWithVarieties
              {...props.pageState.data}
              {...props.swiper}
              membershipGrade={props.membershipGrade}
            />
          ) : (
            <Fragment />
          )}
        </Fragment>
      ) : (
        <React.Fragment />
      )}
    </Fragment>
  );
};

export const ProductDetailTemplate = React.memo(Component);
