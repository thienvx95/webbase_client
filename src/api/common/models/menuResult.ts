export class MenuResult {
  id?: string;
  authority?: string[];
  access?: string[] | string;
  children?: MenuResult[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  name?: string;
  component?: string;
  path?: string;
  exact?: boolean;
  sortOrder?: number;
  parentId?: string;
  layout?: boolean;
  redirect?: string;
}
