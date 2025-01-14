import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import styled from '@emotion/styled';
import { useEffect } from 'react';

interface UserInfoDetailProps {
  editDisabled: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  doubleCheck: boolean;
  setDoubleCheck: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const UserInfoDetail = ({
  editDisabled,
  inputValue,
  setInputValue,
  doubleCheck,
  setDoubleCheck,
  inputRef,
}: UserInfoDetailProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setDoubleCheck(false);
    }
  };
  const handleDeleteClick = () => {
    setDoubleCheck(false);
    setInputValue('');
  };

  const handleDoubleCheckClick = () => {
    if (inputValue === 'nickname') {
      setDoubleCheck(false);
      return sw.toast.error('이미 존재하는 닉네임입니다.');
    }
    if (inputValue.length === 0) {
      return sw.toast.warn('닉네임을 입력하세요.');
    }

    if (inputValue.length < 3) {
      return sw.toast.warn('최소 3자 이상의 닉네임을 입력하세요.');
    }
    sw.toast.success('사용 가능한 닉네임입니다.');
    setDoubleCheck(true);
  };

  useEffect(() => {
    setInputValue('');
  }, []);

  return (
    <InfoDetailBlock>
      <InfoDetail>
        <InfoDetailTitle>아이디</InfoDetailTitle>
        <p>example@email.com</p>
      </InfoDetail>
      <InfoDetail>
        <InfoDetailTitle>닉네임</InfoDetailTitle>
        <Swrapper>
          <InfoDetailInput
            value={inputValue}
            ref={inputRef}
            type="text"
            placeholder="닉네임을 입력하세요"
            disabled={editDisabled}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {inputValue && !editDisabled ? (
            <DeleteButton onClick={handleDeleteClick}>
              <i className="fa-solid fa-xmark" />
            </DeleteButton>
          ) : null}
        </Swrapper>
        <DoubleCheckButton onClick={handleDoubleCheckClick} disabled={editDisabled}>
          {doubleCheck && inputValue ? (
            <i className="fa-solid fa-circle-check" />
          ) : (
            <i className="fa-regular fa-circle-check" />
          )}
        </DoubleCheckButton>
      </InfoDetail>
    </InfoDetailBlock>
  );
};

export default UserInfoDetail;

const InfoDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 4rem;
  padding: 16px 16px;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const InfoDetail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${typo.base};

  p {
    margin-left: 8px;
  }
`;

const InfoDetailTitle = styled.div`
  margin-right: 0.5rem;
  padding: 6px 8px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
  background-color: #fff;
`;

const Swrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  button {
    position: absolute;
    right: 20px;
  }
`;

const InfoDetailInput = styled.input`
  margin-right: 10px;
  padding: 8px 10px;
  color: ${palette.black[100]};
  border-radius: 10px;

  ${({ disabled }) => !disabled && `border: 1px solid ${palette.black[200]}`};

  &::placeholder {
    color: ${palette.grey[300]};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${palette.grey[500]};
  border-radius: 50%;
  background: transparent;
  i {
    font-size: ${typo.base};
  }
`;

const DoubleCheckButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;

  i {
    font-size: ${typo.medium};
  }
`;
