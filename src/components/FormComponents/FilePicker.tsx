import React from 'react';

import {Typography, UploadProps} from 'antd';
import {DraggerProps} from 'antd/lib/upload';

import {FileInputIcon} from '@components/Icons';

import * as S from './FilePicker.styled';

const FilePicker: React.VFC<DraggerProps> = props => {
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.yaml,.yml',
    multiple: false,
    maxCount: 1,
    beforeUpload: () => false,
  };

  return (
    <S.Dragger {...uploadProps} {...props}>
      <S.Container>
        <FileInputIcon />

        <Typography.Text>
          <p>Click or drag your OpenAPI spec to this area to upload</p>
        </Typography.Text>
        <Typography.Text>
          <p>Format accepted: YAML/JSON</p>
        </Typography.Text>
      </S.Container>
    </S.Dragger>
  );
};

export default FilePicker;
