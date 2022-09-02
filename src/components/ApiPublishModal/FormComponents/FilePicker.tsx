import {Typography, UploadProps} from 'antd';

import {FileInputIcon} from '@components/Icons';

import * as S from './FilePicker.styled';

const FilePicker = () => {
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.yaml,.yml',
    multiple: false,
    maxCount: 1,
    customRequest: () => {},
    onChange(info) {
      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(info.file, info.fileList);
      } else if (status === 'error') {
        console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <S.Dragger {...uploadProps}>
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
