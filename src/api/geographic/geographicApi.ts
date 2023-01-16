import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { CountryItem } from './models/countryItem';

export const GeographicAPIPath = {
  countries: `/geographic/countries`,
};

export const GeographicApi = {
  async getCountries(): Promise<ResponseResult<CountryItem[]>> {
    return await httpClient.get(GeographicAPIPath.countries);
  },
};
