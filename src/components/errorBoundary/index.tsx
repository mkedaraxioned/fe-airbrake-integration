// import React, { Component, useState } from 'react';
// import { Notifier } from '@airbrake/browser';
// import {ErrorBoundary} from 'react-error-boundary';
// interface State {
//   React.Component<{}, {}, any>.state: Readonly<{}>
// }
// interface Props {
//   children: any;
// }

// class ErrorBoundary extends React.Component {
//     private airbrake;
//   constructor(props: Props) {
//     super(props);
//     this.state = { hasError: false , error: null};
//     this.airbrake = new Notifier({
//       projectId: ,
//       projectKey: ''
//     });
//   }

//   componentDidCatch(error: any, info: any) {
//     // Display fallback UI
//     this.setState({ hasError: true });
//     // Send error to Airbrake
//     this.airbrake.notify({
//       error: error,
//       params: {info: info}
//     });
//   }

//   render() {
//     if (this.state.error) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }
//     return this.props!.children;
//   }
// }

// export default ErrorBoundary;

// class ErrorBoundary extends React.Component {
//   constructor(props: {} | Readonly<{}>) {
//     super(props);
//     this.state = { error: null, errorInfo: null };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Catch errors in any components below and re-render with error message
//     this.setState({
//       error: error,
//       errorInfo: errorInfo
//     })
//     // You can also log error messages to an error reporting service here
//   }

//   render() {
//     if (this.state.errorInfo) {
//       // Error path
//       return (
//         <div>
//           <h2>Something went wrong.</h2>
//           <details style={{ whiteSpace: 'pre-wrap' }}>
//             {this.state.error && this.state.error.toString()}
//             <br />
//             {this.state.errorInfo.componentStack}
//           </details>
//         </div>
//       );
//     }
//     // Normally, just render children
//     return this.props.children;
//   }
// }

// To  use with react component

// class ErrorBoundary extends React.Component {
//   airbrake: Notifier;
//   state: {
//     hasError: boolean;
//   };
//   constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>> | {children : any}) {
//     super(props);
//     this.state = { hasError: false };
//     this.airbrake = new Notifier({
//       projectId: ,
//       projectKey: ''
//     });
//   }

//   componentDidCatch(error: any, info: any) {
//     // Display fallback UI
//     this.setState({ hasError: true });
//     // Send error to Airbrake
//     this.airbrake.notify({
//       error: error,
//       params: {info: info}
//     });
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }
//     return this.props!.children;
//   }
// }

// const ErrorBoundary = ({ timeLogId, onClose }: Props) => {
//   // airbrake: Notifier;
//   // type: any;
//   // props: any;
//   // key: any;
//   // state: {
//   //   hasError: boolean;
//   // };
//   const [hasError, sethasError] = useState<boolean>(false);
//     // const [loading: any, setLoading: any] = useState<boolean>(false);
//     const airbrake = new Notifier({
//       projectId: ,
//       projectKey: ''
//     });
//   // constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>> | {children : any}) {
//   //   // super(props);
//   //   // this.state = { hasError: false };
//   // }

//   componentDidCatch(error: any, info: any) {
//     // Display fallback UI
//     // this.setState({ hasError: true });
//     // Send error to Airbrake
//     airbrake.notify({
//       error: error,
//       params: {info: info}
//     });
//   }

//     if (hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }
//     return props!.children;

// }

// const ErrorFallback = ({error, resetErrorBoundary}) => {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   )
// }

// export default ErrorBoundary;

// export default ErrorFallback;
