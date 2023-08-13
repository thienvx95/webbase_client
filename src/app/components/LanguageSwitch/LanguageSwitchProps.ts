import { MenuInfo } from 'rc-menu/lib/interface';
export interface LocalData {
  lang: string;
  label?: string;
  icon?: string;
}

export interface LanguageSwitchProps {
  globalIconClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
  menuItemStyle?: object;
  menuItemIconStyle?: object;
  postLocalesData?: LocalData[];
  onItemClick?: (params: MenuInfo) => void;
  className?: string;
  reload?: boolean;
  icon?: React.ReactNode;
}
