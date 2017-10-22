// import * as React from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {ComponentProps, CycleComponent} from '../util/component';
// import {Button, Card, Text} from 'react-native-elements';
// import {NavigationScreenProps} from 'react-navigation';
// import {GoogleSigninButton} from 'react-native-google-signin';
// import {LoginState} from '../states/login.state';
// import {Subject} from 'rxjs/Subject';
// import {Observable} from 'rxjs/Observable';
// import {LoginAction} from '../enums/login.action';
// import {UserModel} from '../models/user.model';
// import {LoginIntent} from '../intents/login.intent';
//
//
// interface SignInProps extends NavigationScreenProps<{}>, ComponentProps<LoginState> {
// }
//
// export class SignInComponent extends CycleComponent<LoginState, LoginAction, SignInProps> {
//     private signinButtonSubject = new Subject<void>();
//
//     componentDidMount() {
//         const model = new UserModel();
//         const intent = new LoginIntent();
//         this.cycle(model, intent);
//     }
//
//     get signinButton$(): Observable<void> {
//         return this.signinButtonSubject.asObservable();
//     }
//
//     get signoutButton$(): Observable<void> {
//         return this.signinButtonSubject.asObservable();
//     }
//
//     redraw(state: LoginState): false | JSX.Element | null {
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
//
//
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
