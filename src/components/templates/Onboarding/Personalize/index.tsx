import React, { Fragment, memo } from 'react';
import { HookState } from 'hooks/pages/onboarding/usePersonalizePage';
import { Loading } from 'components/molecules/Loading';
import { Box, Text, Grid, Image, AspectRatio } from '@chakra-ui/react';
import { ClickableImage } from 'components/atoms/ClickableImage';
import NormalButton from 'components/atoms/NormalButton';
import { FixedButtonWrapper } from 'components/atoms/FixedButtonWrapper';
import { ProcessingIcon } from 'components/atoms/ProcessingIcon';
import { State } from 'hooks/useGetProductsForPersonalize';
import { LayerMast } from 'components/atoms/LayerMask';
import { AlternateDisplay } from 'components/molecules/AlternateDisplay';
const PRODUCT_QUANTITY = 4;

const Component = (props: HookState) => {
  return (
    <Fragment>
      {props.getProductsState === undefined ||
      props.getProductsState.type === 'loading' ? (
        <Loading />
      ) : props.getProductsState.type === 'error' ? (
        <p>エラー</p>
      ) : props.getProductsState.type === 'loaded' ? (
        props.canPersonalizing ? (
          <Box maxW="container.sm" mx="auto" textAlign="center" height="100vh">
            <LayerMast
              height="184px"
              layerProps={{
                background:
                  'linear-gradient(180deg, #FAFAFA 18.75%, rgba(250, 250, 250, 0) 100%)',
              }}
            >
              <AlternateDisplay
                templateColumns={'repeat(4, minmax(0,90px))'}
                columnGap="4"
                py="28px"
                type="odd"
              >
                {[...Array(PRODUCT_QUANTITY)].map((_, index) => {
                  const productData = props.getProductsState as Extract<
                    State,
                    { type: 'loaded' }
                  >;
                  return (
                    <AspectRatio
                      ratio={0.96}
                      key={productData.data.productsForPersonalize[index].id}
                      width="100%"
                    >
                      <Image
                        src={
                          productData.data.productsForPersonalize[index]
                            .imageUrl
                        }
                        alt={`${productData.data.productsForPersonalize[index].id}画像`}
                        borderRadius="5px"
                        height="100%"
                        width="100%"
                      />
                    </AspectRatio>
                  );
                })}
              </AlternateDisplay>
            </LayerMast>
            <Box>
              <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
                {props.firstName === undefined ? '' : props.firstName}さん専用に
                <br />
                パーソナライズ中
              </Text>
            </Box>
            <Box>
              <ProcessingIcon margin="0 auto" />
            </Box>
            <Box py="5">
              <Text fontSize="16px" lineHeight="10">
                あなたにぴったりの商品を探しています。
              </Text>
            </Box>

            <LayerMast
              height="184px"
              layerProps={{
                background:
                  'linear-gradient(180deg, #FAFAFA 18.75%, rgba(250, 250, 250, 0) 100%)',
                transform: 'rotate(-180deg)',
              }}
            >
              <AlternateDisplay
                templateColumns={'repeat(4, minmax(0,90px))'}
                columnGap="4"
                py="28px"
                type="odd"
              >
                {[...Array(PRODUCT_QUANTITY)].map((_, index) => {
                  const productData = props.getProductsState as Extract<
                    State,
                    { type: 'loaded' }
                  >;
                  return (
                    <AspectRatio
                      ratio={0.96}
                      key={productData.data.productsForPersonalize[index].id}
                      width="100%"
                    >
                      <Image
                        src={
                          productData.data.productsForPersonalize[index]
                            .imageUrl
                        }
                        alt={`${productData.data.productsForPersonalize[index].id}画像`}
                        borderRadius="5px"
                        height="100%"
                        width="100%"
                      />
                    </AspectRatio>
                  );
                })}
              </AlternateDisplay>
            </LayerMast>
          </Box>
        ) : (
          <Box px="8" pt="14" maxW="container.sm" mx="auto">
            <Box>
              <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
                {props.firstName ?? ''}さん気になる商品を３つ選んでください。
              </Text>
            </Box>
            <Box py="5">
              <Text fontSize="16px" lineHeight="10">
                あなたにぴったりの商品をお探しします。
                <br />
                お好みの商品をクリックしてください。
              </Text>
            </Box>
            <Grid
              templateColumns={{
                base: 'repeat(3, 1fr)',
                sm: 'repeat(4, 1fr)',
              }}
              columnGap={1}
              rowGap={1}
            >
              {props.getProductsState.data.productsForPersonalize.map(
                (product) => {
                  return (
                    // 0.096 = 100/104
                    <AspectRatio ratio={0.96} key={product.id}>
                      <ClickableImage
                        isSelected={
                          props.productIds.length !== 0
                            ? (props.productIds as string[]).includes(
                                String(product.id)
                              )
                            : false
                        }
                        objectFit="contain"
                        onClick={() =>
                          props.handleProductId(String(product.id))
                        }
                      >
                        <Image
                          alt={`商品${product.id}`}
                          src={product.imageUrl}
                          borderRadius="5px"
                          height="100%"
                          width="100%"
                        />
                      </ClickableImage>
                    </AspectRatio>
                  );
                }
              )}
            </Grid>
            <Box py="5">
              <FixedButtonWrapper>
                <NormalButton
                  w="full"
                  type="submit"
                  isLoading={props.isSubmitting}
                  isDisabled={!props.canSubmit}
                  onClick={() => props.onSubmit()}
                >
                  続ける
                </NormalButton>
              </FixedButtonWrapper>
            </Box>
          </Box>
        )
      ) : (
        <div />
      )}
    </Fragment>
  );
};

export const PersonalizeTempllate = memo(Component);
