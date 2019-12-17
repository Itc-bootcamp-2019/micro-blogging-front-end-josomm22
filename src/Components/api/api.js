import axios from 'axios';

export function getTweets() {
    return axios.get('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet');
};
export function sendTweet(obj) {
    console.log({ obj })
    return axios.post('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet', { "tweet": obj })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        }
        )
}
export function sortDescending(arr) {
    return arr.sort((a, b) => (a.date > b.date) ? 1 : -1);

}