import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { tabMenus } from '@/constants/tabMenu';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { changeUser } from '@/store/userSlice';

interface TabMenuProps {}

const TabMenu = (props: TabMenuProps) => {
  const userType = useSelector((state: RootState) => state.user.userType);
  const dispatch = useAppDispatch();

  return (
    <TabMenuBlock>
      {tabMenus.map(tab => (
        <Tab
          key={tab.type}
          type={tab.type}
          focus={userType === tab.type}
          onClick={() => {
            dispatch(changeUser(tab.type));
          }}
        >
          {tab.name}
        </Tab>
      ))}
    </TabMenuBlock>
  );
};

export default TabMenu;

type tabStyleProps = {
  type: 'user' | 'manager';
  focus: boolean;
};

const TabMenuBlock = styled.ul`
  display: flex;
  justify-content: center;
`;

const Tab = styled.li<tabStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 12px 0;
  width: 140px;
  border: 1px solid ${palette.black[100]};
  border-radius: 10px 0 0 10px;
  color: ${palette.black[100]};

  ${({ type }) => type === 'manager' && `border-radius: 0 10px 10px 0;`};

  ${({ focus }) =>
    focus &&
    `
    background-color: ${palette.black[100]};
    color: white;
  `}
`;
