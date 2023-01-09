import { CrownOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';
import type { DataNode } from 'antd/lib/tree';
import { commonMessages } from 'app/messages';
import i18next from 'i18next';
import React from 'react';

const IconMap = {
  crown: <CrownOutlined />,
};
export const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
  }));

export const loopMenuTreeItem = (
  menus: DataNode[],
  parentTitle?: string,
): DataNode[] =>
  menus.map(({ title, children, ...item }) => ({
    ...item,
    title: `${parentTitle ? i18next.t(commonMessages[parentTitle]()) : ''}`,
    children:
      children &&
      loopMenuTreeItem(
        children,
        `${parentTitle ? `${parentTitle}` : ''}.${title}`,
      ),
  }));
