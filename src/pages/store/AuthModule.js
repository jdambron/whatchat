import firebase from 'firebase';

const AuthModule = {
    state:{
        signed_up: false
    },
    getters:{
        signed_up:state=>state.signed_up
    },
    mutations:{
        setSignedUp(state,payload){
            state.signed_up = payload
        }
    },
    actions:{
        signUp({commit, dispatch},payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
                .then(data=>{
                    firebase.database().ref('users').child(data.user.uid).set({
                        uid:data.user.uid,
                        name:payload.name,
                        email:payload.email,
                        emailverified:false
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
