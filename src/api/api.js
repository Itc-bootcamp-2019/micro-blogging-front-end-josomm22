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
                messages = [...messages,message];

            }



            // console.log(messages);


        })
        callback(messages);


    });
}