import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {useAppDispatch} from '@redux/hooks';

import * as S from './styled';

interface IProps {
  activeTabKey: string;
  tabs: {key: string; label: string}[];
  setActiveTab: ActionCreatorWithPayload<any, string>;
}

const InfoTabs: React.FC<IProps> = props => {
  const {activeTabKey, tabs, setActiveTab} = props;

  const dispatch = useAppDispatch();

  return (
    <S.InfoTabsContainer>
      {tabs.map(tab => (
        <S.InfoTabsLabel
          $isSelected={activeTabKey === tab.key}
          key={tab.key}
          onClick={() => dispatch(setActiveTab(tab.key))}
        >
          {tab.label}
        </S.InfoTabsLabel>
      ))}
    </S.InfoTabsContainer>
  );
};

export default InfoTabs;
