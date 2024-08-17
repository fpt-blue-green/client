import { FC } from 'react';

interface WizardProps {
  items: StepWizardModel[];
}
interface StepWizardModel {
  key: number;
  image?: string;
  iconComponent?: React.ReactNode;
  description?: string;
}

const Wizard: FC<WizardProps> = (props) => {
  const { items } = props;
  return (
    <div className="flex flex-col p-6 ">
      {items?.map((step, index) => (
        <div key={step.key} className="flex items-start mb-11">
          <div className="relative p-4 bg-gradient mr-4 rounded-full text-2xl flex items-center justify-center">
            <div className=" rounded-full text-primary-foreground">{step.iconComponent}</div>
            <div
              className={`
                    absolute  h-[125%] bg-gradient -bottom-[70px]
                    ${index === items.length - 1 ? 'w-0' : 'w-2'}
                    `}
              style={{
                content: '',
              }}
            />
          </div>
          <p className="text-sm p-1">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Wizard;
