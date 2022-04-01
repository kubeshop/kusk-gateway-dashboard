import styled from 'styled-components';

import Colors from '@styles/colors';

export const InfoTabsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const InfoTabsLabel = styled.span<{$isSelected: boolean}>`
  ${({$isSelected}) => `
    color: ${$isSelected ? Colors.grey9 : Colors.grey1};
  `}

  font-size: 16px;
  cursor: pointer;
  position: relative;

  &::after {
    ${({$isSelected}) => {
      if ($isSelected) {
        return `
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            border: 1px solid ${Colors.grey9};  
        `;
      }
    }}
  }
`;
