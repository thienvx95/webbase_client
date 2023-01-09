import React from 'react';
import { Button, Result } from 'antd';
import { globalNavigate } from 'app';
const DashboardNoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button
        type="primary"
        onClick={() => globalNavigate('/', { replace: true })}
      >
        Back Home
      </Button>
    }
  />
);

export default DashboardNoFoundPage;
