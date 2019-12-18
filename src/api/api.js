import axios from 'axios';

export function getTweets() {
    return axios.get('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet');
};
export function sendTweet(obj) {
    return axios.post('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet', { "tweet": obj })
}
export function sortDescending(arr) {
    return arr.sort((a, b) => (a.date > b.date) ? 1 : -1);

}