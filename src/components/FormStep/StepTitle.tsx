import ExternalLinkIcon from '@components/Icons/ExternalLink';

import * as S from './StepTitle.styled';

interface IProps {
  documentationLink: string;
  title: string;
  isStepApplicable?: boolean;
}

const StepTitle: React.FC<IProps> = props => {
  const {title, documentationLink} = props;

  return (
    <>
      <S.StepTitleContainer>
        {title}
      </S.StepTitleContainer>

      {documentationLink.length > 0 && (
        <S.LearnMoreContainer href={documentationLink} rel="noopener noreferrer" target="_blank">
          Learn more
          <ExternalLinkIcon height={15} width={15} />
        </S.LearnMoreContainer>
      )}
    </>
  );
};

export default StepTitle;
