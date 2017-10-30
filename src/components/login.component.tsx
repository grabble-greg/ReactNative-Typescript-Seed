// import * as React from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {CycleComponent, Sinks, Sources} from '../util/component';
// import {Button, Card, Text} from 'react-native-elements';
// import {NavigationScreenProps} from 'react-navigation';
// import {GoogleSigninButton} from 'react-native-google-signin';
// import {Subject} from 'rxjs/Subject';
// import {Observable} from 'rxjs/Observable';
//
// interface SignInProps extends NavigationScreenProps<{}> {
// }
//
// interface LoginState {
//     hasGooglePlayServices: boolean;
//     isLoggedIn: boolean;
//     user?: any;
//     error?: any;
// }
//
// export class LoginComponent extends CycleComponent<LoginState, SignInProps> {
//
//     main(sources: Sources<LoginState>): Sinks<LoginState> {
//         const navigation = this.props.navigation;
//
//         if (!state) {
//             return (
//                 <View style={styles.container}>
//                     <Text>Loading...</Text>
//                 </View>
//             )
//         }
//
//         if (state.canLogin) {
//             return (
//                 <View style={styles.container}>
//                     <Card>
//                         <GoogleSigninButton
//                             style={{width: 212, height: 48}}
//                             size={GoogleSigninButton.Size.Standard}
//                             color={GoogleSigninButton.Color.Dark}
//                             onPress={() => this.signinButtonSubject.next()}>
//                         </GoogleSigninButton>
//                     </Card>
//                 </View>
//             );
//         } else if (!state.canLogin && !state.loginError) {
//             return (
//                 <View style={styles.container}>
//                     <Text>Can't login as you do not have the Google Play services installed.</Text>
//                 </View>
//             );
//         } else {
//             return (
//                 <View style={styles.container}>
//                     <Text>{ JSON.stringify(state.loginError) }</Text>
//                 </View>
//             )
//         }
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });
