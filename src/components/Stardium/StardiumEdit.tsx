import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React, { useCallback, useRef, useState } from 'react';
import { typo } from '@/lib/styles/typo';
import { stardiumWriteState } from '@/store/stardiumWriteSlice';
import Responsive from '../common/Responsive';
import StardiumEidtImage from './StardiumEditElements/StardiumEidtImage';
import StardiumEditInput from './StardiumEditElements/StardiumEditInput';
import StardiumEditTag from './StardiumEditElements/StardiumEditTag';
import StardiumEditAddress from './StardiumEditElements/StardiumEditAddress';
import StardiumTime from './StardiumEditElements/StardiumTime';
import StardiumRentalItem from './StardiumEditElements/StardiumRentalItem';
import Dividers from '../common/Dividers';

interface StardiumEditProps {
  write: stardiumWriteState;
}

const StardiumEdit = ({ write }: StardiumEditProps) => {

  const handleSumbitStardium = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StardiumEditBlock>
      <StardiumEditForm onSubmit={handleSumbitStardium}>
        <StardiumEidtImage images={write.images} />
        <Dividers />
        <StardiumEditInput
          type="text"
          name="name"
          id="stardiumName"
          title="체육관 이름"
          placeholder="체육관 이름"
          value={write.name}
        />
        <StardiumEditAddress address={write.address} detailAddress={write.detailAddress} />
        <StardiumEditInput
          type="text"
          name="price"
          id="stardiumPrice"
          title="체육관 가격"
          placeholder="체육관 가격"
          value={write.price}
        />
        <StardiumEditTag tags={write.tags} />
        <StardiumTime startTime={write.startTime} endTime={write.endTime} />
        <StardiumRentalItem />
        <button type="submit">등록하기</button>
      </StardiumEditForm>
    </StardiumEditBlock>
  );
};

const StardiumEditBlock = styled.div`
  padding-top: 2rem;

  hr {
    width: 100%;
    border-top: 1px solid #bbb;
  }

  ${Responsive.ResponsiveWrapper}
`;

const StardiumEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  div > label {
    display: block;
  }

  button[type='submit'] {
    width: 80%;
    height: 50px;
    border-radius: 10px;
    background-color: black;
    font-weight: bold;
    font-size: ${typo.medium};
    color: #fff;
  }
`;

export default StardiumEdit;
