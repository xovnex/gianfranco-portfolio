import { Component, ErrorInfo, ReactNode } from 'react';
import { readInitialPortfolioLanguage } from '../i18n/readInitialLanguage';
import { translations } from '../i18n/translations';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const lang = readInitialPortfolioLanguage();
      const copy = translations[lang];
      return (
        <div className="min-h-screen flex items-center justify-center bg-page text-text-main p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{copy.errorPageTitle}</h1>
            <p className="mb-4">{copy.errorPageDescription}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-fg rounded hover:bg-primary/80 transition-colors"
            >
              {copy.errorPageReload}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;