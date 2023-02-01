import React from 'react';
import styled from 'styled-components/macro';

const ViewHeaderContainer = styled.div`
  display: flex;
  .icon {
    font-size: 20px;
    padding: 5px 10px 5px 5px;
    color: #a9a9a9;
  }
`;

interface ViewHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode | JSX.Element;
}

export const ViewHeader: React.FC<ViewHeaderProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <ViewHeaderContainer>
      <div className="icon">{icon}</div>
      <div>
        <h5>{title}</h5>
        <h5> {description}</h5>
      </div>
    </ViewHeaderContainer>
  );
};
