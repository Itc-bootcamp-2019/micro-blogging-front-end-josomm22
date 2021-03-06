import axios from 'axios';
import firebase from '../firebase';

export function getTweets() {
    return axios.get('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet');
};
export function sendTweet(obj) {
    return axios.post('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet', { "tweet": obj })
};
export function sortDescending(arr) {
    return arr.sort((a, b) => (a.date < b.date) ? 1 : -1);

};

export function sendTweetToDB(obj) {
    return firebase.firestore().collection('tweets').add({
        uid: obj.userName,
        date: obj.date,
        content: obj.content
    })
};

export function listenToTweetsChange(num ,callback) {
    let messages = [];

    var query = firebase.firestore()
        .collection('tweets')
        .orderBy('date', 'desc')
        .limit(num);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
                let message = change.doc.data();
                messages = [...messages, message];

            }



            // console.log(messages);


        })
        callback(messages);


    });
};
export function checkUserDB(user) {
    let photoURL;
    if(!user.photoURL){
        photoURL = `http://via.placeholder.com/150/0000FF/FFFFFF/?text=${user.displayName[0]}`;
        user.updateProfile({
            photoURL: photoURL,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }else{
        photoURL = user.photoURL;
    }
    return firebase.firestore().collection('users').doc(user.uid).set({
        userName: user.displayName,
        photoURL: photoURL
    })
};
export function getUserNameFromUID(uid) {

    return firebase.firestore().collection('users').doc(uid).get().then(function (doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data().userName);
            let userData = doc.data()
            return userData;

        } else {
            // console.log("No such document!");
            let userData = 'Legacy'
            return userData;

        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

};