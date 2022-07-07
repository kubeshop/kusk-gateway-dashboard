import React from 'react';

import {Button, Collapse, Form, Tag, Typography} from 'antd';

import {InfoPanelDeleteIcon} from '@components/AntdCustom';

interface IProps {
  setAddPathModal: (open: boolean) => void;
}

const Paths: React.FC<IProps> = ({setAddPathModal}) => {
  const form = Form.useFormInstance();

  const handleDeletePath = (event: React.MouseEvent<HTMLSpanElement>, path: any) => {
    event.stopPropagation();
    const {paths} = form.getFieldValue('paths');
    const updatedPaths = paths.filter((p: any) => p.path.name !== path.path.name);
    form.setFieldsValue({paths: {paths: updatedPaths}});
  };

  return (
    <>
      <Form.Item
        name={['paths', 'paths']}
        label="Paths List"
        rules={[
          {required: true, message: 'At least one path is needed'},
          ({getFieldValue}) => ({
            validator() {
              if (getFieldValue(['paths', 'paths'])?.length > 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Add one path at least'));
            },
          }),
        ]}
      >
        <Button htmlType="button" onClick={() => setAddPathModal(true)}>
          Add Path
        </Button>
      </Form.Item>
      <Form.Item shouldUpdate={(prevValues, curValues) => prevValues?.paths?.paths !== curValues?.paths?.paths}>
        {({getFieldValue}) => {
          const paths = getFieldValue(['paths', 'paths']) || [];
          return paths.length ? (
            <Collapse defaultActiveKey={['0']}>
              {paths.map((path: any) => (
                <Collapse.Panel
                  header={path.path.name}
                  key={path.name}
                  extra={<InfoPanelDeleteIcon onClick={event => handleDeletePath(event, path)} />}
                >
                  {path.path.methods.map((method: string) => (
                    <div style={{margin: ' 8px 0'}} key={`${path.path.name}__${method}`}>
                      <Typography.Text>
                        <Tag style={{width: 62, textAlign: 'center'}}>{method}</Tag>
                        <Typography.Text>{path.path.name}</Typography.Text>
                      </Typography.Text>
                    </div>
                  ))}
                </Collapse.Panel>
              ))}
            </Collapse>
          ) : (
            <Typography.Text className="ant-form-text" type="secondary">
              No path yet.
            </Typography.Text>
          );
        }}
      </Form.Item>
    </>
  );
};

export default Paths;
