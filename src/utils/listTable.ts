import Colors from '@styles/colors';

export const ListTableStyle = `
    border: 1px solid ${Colors.grey4};

    & .ant-table-thead {
        background: ${Colors.grey3};
    }

    & .ant-table-tbody > tr:hover > td {
        background: ${Colors.grey2};
    }

    & .ant-table-thead > tr > th {
        background: ${Colors.grey3};
        color: ${Colors.grey9};
        border-bottom: 1px solid ${Colors.grey4};
    }

    & .ant-table-tbody > tr > td {
        background: ${Colors.grey2};
        border-bottom: 1px solid ${Colors.grey4};
        color: ${Colors.grey9};
    }
`;
