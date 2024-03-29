import {Dropdown as AntDropdown, Select as AntSelect, Tree as AntTree} from 'antd';

import {SearchOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  overflow: hidden;
`;

export const Filters = styled.div`
  padding: 16px;
  display: grid;
  gap: 16px;
`;

export const Tree = styled(AntTree)`
  .ant-tree-treenode {
    width: 100%;
    height: 40px;
  }
  .ant-tree-treenode:hover {
    background-color: ${Colors.blue50};
    color: ${Colors.blue500};
    svg {
      fill: ${Colors.blue500};
    }

    .ant-typography {
      color: ${Colors.blue500};
    }
  }

  .ant-tree-treenode.ant-tree-treenode-selected {
    background-color: ${Colors.zinc5} !important;
    color: ${Colors.blue500};
    svg {
      fill: ${Colors.blue500};
    }

    .ant-typography {
      color: ${Colors.blue500};
    }
  }

  .ant-tree-node-content-wrapper {
    width: 100%;
    align-self: center;
  }

  .ant-tree-node-content-wrapper .anticon {
    visibility: hidden;
  }

  .ant-tree-node-content-wrapper:hover {
    background-color: unset;
    svg {
      fill: ${Colors.blue500};
    }
  }

  .ant-tree-node-content-wrapper:hover .anticon {
    visibility: visible;
  }

  .anticon:hover {
    background-color: ${Colors.blue100};
  }
  .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: unset;
  }
  .ant-tree-switcher {
    align-self: center;
  }
`;

export const SearchOutlinedIcon = styled(SearchOutlined)`
  color: ${Colors.zinc3};
`;

export const Select = styled(props => <AntSelect {...props} />)`
  .ant-select-arrow svg {
    fill: ${Colors.zinc3};
  }
`;

export const Path = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 24px;
  margin-top: 2px;
  align-self: center;
  .ant-typography {
    text-overflow: ellipsis;
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    /* direction: rtl;
    text-align: left; */
  }
`;

export const Dropdown = styled(AntDropdown)`
  & .anticon:hover {
    color: black;
  }
`;
