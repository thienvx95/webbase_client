import React from 'react';
import styled from 'styled-components/macro';

const HeaderPanelContainer = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-size: 20px;
    padding: 5px 10px 5px 5px;
    color: #a9a9a9;
  }
`;

interface HeaderPanelProps {
  title: string;
  description?: string;
  icon?: React.ReactNode | JSX.Element;
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <HeaderPanelContainer>
      <div className="icon">{icon}</div>
      <div>
        <h5>{title}</h5>
        <h5> {description}</h5>
      </div>
    </HeaderPanelContainer>
  );
};
