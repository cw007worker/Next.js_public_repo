import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { ToAppTemplate } from 'components/templates/ToApp';
import { useToAppPage } from 'hooks/pages/onboarding/useToAppPage';

const ToApp = () => {
  const state = useToAppPage();

  return (
    <LayoutForAuth>
      <ToAppTemplate {...state} />
    </LayoutForAuth>
  );
};

export default ToApp;
