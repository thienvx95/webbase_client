import { PageLoading } from '@ant-design/pro-components';
import { Descriptions } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { selectUserIpLookup } from '../../../slice/selectors';
import { messages } from './messages';

export const CurrentLocation: React.FC = () => {
  const { t } = useTranslation();
  const userIpLookup = useSelector(selectUserIpLookup);

  const googleMapDefaultProps = useMemo(() => {
    if (userIpLookup != null) {
      return {
        center: {
          lat: parseFloat(userIpLookup?.lat),
          lng: parseFloat(userIpLookup?.lon),
        },
        zoom: 14,
      };
    }
    return null;
  }, [userIpLookup]);

  return !userIpLookup ? (
    <PageLoading />
  ) : (
    <>
      <Descriptions title={t(messages.currentLocation())}>
        <Descriptions.Item label={t(messages.continent())}>
          {userIpLookup?.continent}
        </Descriptions.Item>
        <Descriptions.Item label={t(messages.country())}>
          {userIpLookup?.country}
        </Descriptions.Item>
        <Descriptions.Item label={t(messages.city())}>
          {userIpLookup?.city}
        </Descriptions.Item>
        <Descriptions.Item label={t(messages.org())}>
          {userIpLookup?.org}
        </Descriptions.Item>
        <Descriptions.Item label={t(messages.ip())}>
          {userIpLookup?.query}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY_GOOGLE,
          }}
          defaultCenter={googleMapDefaultProps?.center}
          defaultZoom={googleMapDefaultProps?.zoom}
        ></GoogleMapReact>
      </div>
    </>
  );
};
