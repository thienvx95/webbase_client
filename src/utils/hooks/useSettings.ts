import { SettingContext } from 'providers/settings/settingProvider';
import { useContext } from 'react';
export const useSettings = () => {
  return useContext(SettingContext);
};
