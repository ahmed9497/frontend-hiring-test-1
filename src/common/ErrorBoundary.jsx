import React, { Component } from "react";
import NotFound from "../screens/notFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <NotFound/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
