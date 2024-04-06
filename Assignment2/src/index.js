import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; 
import App from './App';

// Global Error Handling (Optional)
const ErrorBoundary = ({ error, resetError }) => {
  return (
    <div>
      <p>An error occurred: {error.message}</p>
      <button onClick={resetError}>Try Again</button>
    </div>
  );
};

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show error info
    return { error };
  }

  handleResetError = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorBoundary error={this.state.error} resetError={this.handleResetError} />
      );
    }

    return this.props.children;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler>
      <App />
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById('root')
);
