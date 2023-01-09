import { ProSettings } from '@ant-design/pro-components';
import { MenuResult } from 'api/common/models/menuResult';
import { themes } from 'providers/layout/themes';

export type ThemeKeyType = keyof typeof themes | 'system';

export interface AppLayoutState {
  theme: ThemeKeyType;
  loading: boolean;
  settings: Partial<ProSettings> | undefined;
  menus: MenuResult[] | [];
}
