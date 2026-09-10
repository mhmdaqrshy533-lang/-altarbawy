import React from 'react';
import { AlertCircle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class RaqeemErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[RaqeemErrorBoundary] Caught UI error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[350px] w-full flex items-center justify-center p-6 select-none font-sans" dir="rtl">
          <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldAlert size={32} />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              {this.props.fallbackTitle || 'تعذّر تحميل هذا الجزء من المستند'}
            </h3>

            <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">
              تم حماية بياناتك المحفوظة تلقائياً في الذاكرة المستديمة IndexedDB لمنع أي فقدان للمستند.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-[#004B6E] hover:bg-[#003B57] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <RefreshCw size={14} />
                <span>إعادة المحاولة بأمان</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
