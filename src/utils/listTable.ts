import Colors from '@styles/colors';

export const ListTableStyle = `
    border: 1px solid ${Colors.grey4};  

    & .ant-table-tbody > tr:hover > td {
        cursor: pointer;
    }

    & .ant-table-thead > tr > th {
        color: ${Colors.grey9};
        border-bottom: 1px solid ${Colors.grey4};
    }

    & .ant-table-tbody > tr > td {
        border-bottom: 1px solid ${Colors.grey4};
        color: ${Colors.grey9};
    }
`;
