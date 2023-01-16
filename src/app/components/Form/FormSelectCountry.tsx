import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import { DefaultOptionType } from 'antd/es/select';
import { GeographicApi } from 'api/geographic/geographicApi';
import { CountryItem } from 'api/geographic/models/countryItem';
import { formMessages } from 'app/messages';
import { layoutActions } from 'providers/layout/slice';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export interface FormSelectCountryProps<T> extends ProFormSelectProps<T> {
  hideLabel?: boolean;
  required?: boolean;
}

export const FormSelectCountry = (
  props: FormSelectCountryProps<CountryItem>,
) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await GeographicApi.getCountries();
      if (result.success) {
        var data = result.data.map(item => {
          return {
            label: item.name,
            value: item.code,
          };
        }) as DefaultOptionType[];
        setOptions(data);
        return;
      }
      dispatch(fetchError());
      return;
    };
    fetchData();
  }, []);
  const { fetchError } = layoutActions;
  const dispatch = useDispatch();
  return (
    <ProFormSelect
      width={props.width}
      name={props.name}
      label={props.hideLabel ? '' : t(formMessages.title('country'))}
      placeholder={t(formMessages.title('country')) ?? ''}
      rules={[
        {
          required: props.required,
          message: t(formMessages.require('country')) ?? '',
        },
      ]}
      showSearch
      fieldProps={{ notFoundContent: null }}
      options={options}
    />
  );
};
