import React from 'react';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './css/login.css';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };
  
  class SignInScreen extends React.Component {
    render() {
      return (
        <div className='login-box'>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
  }
// class SignInScreen extends React.Component {

//     // The component's Local state.
//     state = {
//       isSignedIn: false // Local signed-in state.
//     };
  
//     // Configure FirebaseUI.
//     uiConfig = {
//       // Popup signin flow rather than redirect flow.
//       signInFlow: 'popup',
//       // We will display Google and Facebook as auth providers.
//       signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.FacebookAuthProvider.PROVIDER_ID
//       ],
//       callbacks: {
//         // Avoid redirects after sign-in.
//         signInSuccessWithAuthResult: () => false
//       }
//     };
  
//     // Listen to the Firebase Auth state and set the local state.
//     componentDidMount() {
//       this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
//           (user) => this.setState({isSignedIn: !!user})
//       );
//     }
    
//     // Make sure we un-register Firebase observers when the component unmounts.
//     componentWillUnmount() {
//       this.unregisterAuthObserver();
//     }
  
//     render() {
//         console.log(this.state.isSignedIn);
//         // let user = firebase.auth().currentUser;
//         // console.log(user);
//         // debugger
//       if (!this.state.isSignedIn) {
//         return (
//           <div>
//             <h1>My App</h1>
//             <p>Please sign-in:</p>
//             <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
//           </div>
//         );
//       }
//       return (
//         <div>
//           <h1>My App</h1>
//           <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
//           <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
//         </div>
//       );
//     }
//   }
  export default SignInScreen;
  