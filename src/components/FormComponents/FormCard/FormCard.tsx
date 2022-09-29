import {FC} from 'react';

import {Button, CardProps, Form, FormProps, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

interface IProps {
  heading: string;
  subHeading: string;
  helpTopic?: string;
  helpLink?: string;
  cardProps?: CardProps;
  formProps?: FormProps;
  isViewMode?: boolean;
}

const FormCard: FC<IProps> = props => {
  const {heading, subHeading, helpTopic, helpLink, cardProps, formProps, children, isViewMode} = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    formProps?.onFinish && formProps?.onFinish(values);
    setTimeout(() => {
      form.resetFields();
    }, 1000);
  };

  const onCancelClick = () => {
    form.resetFields();
  };

  return isViewMode ? (
    <S.Card
      {...cardProps}
      title={
        <CardHeading
          heading={heading}
          subHeading={
            <Typography.Text>
              {subHeading}
              <Typography.Link href={helpLink} target="_blank">
                &nbsp;Learn more
              </Typography.Link>
            </Typography.Text>
          }
        />
      }
    >
      <Form form={form} disabled {...formProps}>
        {children}
      </Form>
    </S.Card>
  ) : (
    <Form form={form} {...formProps} onFinish={onFinish}>
      <S.Card {...cardProps} title={<CardHeading heading={heading} subHeading={subHeading} />}>
        {children}

        <S.CardActions>
          {helpTopic && (
            <Typography.Text type="secondary">
              Learn more about&nbsp;
              <Typography.Link href={helpLink} target="_blank">
                {helpTopic}
              </Typography.Link>
            </Typography.Text>
          )}
          <S.ActionButtons>
            <Form.Item shouldUpdate>
              {() => form.isFieldsTouched() && <Button onClick={onCancelClick}>Cancel</Button>}
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <S.SaveButton
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched() || form.getFieldsError().filter(({errors}) => errors.length).length > 0
                  }
                >
                  Save
                </S.SaveButton>
              )}
            </Form.Item>
          </S.ActionButtons>
        </S.CardActions>
      </S.Card>
    </Form>
  );
};

export default FormCard;
