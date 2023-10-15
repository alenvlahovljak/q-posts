import { ComponentType, FC } from 'react';

interface LoggerProps {
  logMessage?: string;
}

const logMessagesMap: Record<string, string> = {};

const withLogging = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithLogging: FC<P & LoggerProps> = (props) => {
    const componentName = getDisplayName(WrappedComponent);
    const logMessage = props.logMessage || logMessagesMap[componentName] || 'Hello from';

    console.log(`${logMessage} ${componentName}`);

    return <WrappedComponent {...props} />;
  };

  WithLogging.displayName = `WithLogging(${getDisplayName(WrappedComponent)})`;

  return WithLogging;
};

const getDisplayName = (WrappedComponent: ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withLogging;
