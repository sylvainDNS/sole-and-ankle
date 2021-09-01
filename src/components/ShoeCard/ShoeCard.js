import React from 'react';
import styled, { css } from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Flag from '../Flag/Flag';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const isOnSale = variant ==='on-sale'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag variant={variant}/>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={isOnSale}>
            {formatPrice(price)}
          </Price>
          {
            isOnSale
              ? <SalePrice>{formatPrice(salePrice)}</SalePrice> 
              : null
          }
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  background-color: #f5f5f5;
  border-radius: 16px 16px 4px 4px;
  display: block;
  padding-bottom: 10%;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  
  display: flex;
  gap: 16px;
  justify-content: space-between;
  position: relative;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${p => p.isOnSale
    ? css`
      color: ${COLORS.gray[700]};
      text-decoration-line: line-through;
    `
    : null
  };
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};

  bottom: -100%;
  right: 0;
  position: absolute;
`;

export default ShoeCard;
