import styled from 'styled-components/macro';
import { Avatar as AvatarAnt } from 'antd';
import { setAlpha } from '@ant-design/pro-components';
import { media } from 'styles/media';
import React from 'react';

const Avatar = styled(AvatarAnt)`
  margin-right: 8px;
  color: ${p => p.theme.colorPrimary};
  vertical-align: top;
  background: ${p => setAlpha(p.theme.colorBgContainer, 0.85)};
  ${media.minmd} {
    margin: 0px;
  }
`;

export const AvatarLogo = ({ src }) => {
  return <Avatar size="small" src={src} alt="avatar" />;
};
