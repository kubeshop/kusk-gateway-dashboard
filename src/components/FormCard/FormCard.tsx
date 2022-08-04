import {FC} from 'react';

import {Card, CardProps, Form, FormProps, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

interface IProps {
  heading: string;
  subHeading: string;
  helpTopic?: string;
  helpLink?: string;
  cardProps?: CardProps;
  formProps?: FormProps;
}

const FormCard: FC<IProps> = ({heading, subHeading, helpTopic, helpLink, cardProps, formProps, children}) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} {...formProps} disabled>
      <Card {...cardProps} title={<CardHeading heading={heading} subHeading={subHeading} />}>
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
        </S.CardActions>
      </Card>
    </Form>
  );
};

export default FormCard;
