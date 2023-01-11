import styled from 'styled-components/macro';

export const RightForm = styled.div`
  flex: 1;
  padding-left: 104px;
  .avatar_title {
    height: 22px;
    margin-bottom: 8px;
    color: ${p => p.theme.headingColor};
    font-size: ${p => p.theme.fontSizeBase};
    line-height: 22px;
  }
  .avatar {
    width: 144px;
    height: 144px;
    margin-bottom: 12px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .button_view {
    width: 144px;
    text-align: center;
  }
`;
