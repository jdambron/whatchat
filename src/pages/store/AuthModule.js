import firebase from 'firebase';

const AuthModule = {
    state:{
        signed_in:false,
        signed_up: false,
        show_resend_email: false
    },
    getters:{
        signed_in:state=>state.signed_in,
        signed_up:state=>state.signed_up,
        show_resend_email:state=>state.show_resend_email
    },
    mutations:{
        setSignedIn(state,payload){
            state.signed_in = payload
        },
        setSignedUp(state,payload){
            state.signed_up = payload
        },
        setShowResendEmail(state,payload){
            state.show_resend_email = payload
        }
    },
    actions:{
        signIn({commit}, payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user.emailVerified) {
                            // User is signed in
                            commit('setSignedIn', true)
                            commit('setAlertMessage', user.displayName)
                            commit('setShowResendEmail', false)
                        } else {
                            // User is signed out
                            commit('setSignedIn', false)
                            commit('setAlertMessage', 'Please verify your email')
                            commit('setShowResendEmail', true)
                        }
                    })
                    commit('setSignedIn', true)
                })
                .catch((error) => {
                    commit('setAlertMessage', error)
                });
        },
        signUp({commit, dispatch},payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
                .then(data=>{
                    firebase.database().ref('users').child(data.user.uid).set({
                        uid:data.user.uid,
                        name:payload.name,
                        email:payload.email,
                        emailVerified:false
                    });
                    let newuser = data.user;
                    newuser.updateProfile({
                        displayName:payload.name
                    })
                        .then(()=>{
                            dispatch('sendVerification')
                            commit('setSignedUp',true)
                            console.log('updated profile')
                        }).catch(err=>{
                            console.log(err.message)
                            commit('setAlertMessage', err.message);
                        })

                }).catch(err=>{
                    console.log(err.message)
                    commit('setAlertMessage', err.message);
                })
        },
        signOut({commit}){
            firebase.auth().signOut().then(()=>{
                commit('setSignedIn', false)
            })
        },
        sendVerification({commit}){
            var user = firebase.auth().currentUser;
            user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    commit('setAlertMessage', `A verification email has been been sent to ${user.email}`)
                });
        }
    }
}
export default AuthModule
