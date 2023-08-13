import { PageLoading } from '@ant-design/pro-components';
import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUserIpLookup } from '../../../slice/selectors';
import { messages } from './messages';

export const CurrentLocation: React.FC = () => {
  const { t } = useTranslation();
  const userIpLookup = useSelector(selectUserIpLookup);

  var items: DescriptionsProps['items'] = [
    {
      label: t(messages.org()),
      key: 'org',
      children: userIpLookup?.org,
    },
    {
      label: t(messages.continent()),
      key: 'contient',
      children: userIpLookup?.continent,
    },
    {
      label: t(messages.country()),
      key: 'country',
      children: userIpLookup?.country,
    },
    {
      label: t(messages.city()),
      key: 'city',
      children: userIpLookup?.city,
    },

    {
      label: t(messages.ip()),
      key: 'ip',
      children: userIpLookup?.query,
    },
  ];
  return !userIpLookup ? (
    <PageLoading />
  ) : (
    <Descriptions
      bordered
      layout="vertical"
      title={t(messages.currentLocation())}
      items={items}
    ></Descriptions>
  );
};
