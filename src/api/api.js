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
        userName: obj.userName,
        date: obj.date,
        content: obj.content
    })
};

export function listenToTweetsChange(callback) {
    let messages = [];

    var query = firebase.firestore()
        .collection('tweets')
        .orderBy('date', 'desc')
        .limit(10);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            console.log(change)
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
    return firebase.firestore().collection('users').doc(user.uid).set({
        userName: user.displayName,
    })
};
export function getUserNameFromUID(uid) {
    // let messageName;
    firebase.firestore().collection('users').doc(uid).get().then(function (doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data().userName);
            const messageName = doc.data().userName;
            return messageName

        } else {
            // console.log("No such document!");
            const messageName = 'Legacy'
            return messageName

        }
        // console.log(messageName)

    }).catch(function (error) {
        console.log("Error getting document:", error);
    });


};