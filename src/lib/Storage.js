// let messages = [
//     {
//         id: 1,
//         login: 'fufu',
//         createdOn: '',
//         content: 'loredlsldlsllsldsdlslds'
//     }
// ]



export function getStorage() {
    let messages2 = localStorage.getItem('faketweet')
    if (messages2 != null) {
        messages2 = JSON.parse(messages2);
        return messages2;
    } else {
        return [];


    }
}

export function setStorage(messagesArr) {
    let messageString = JSON.stringify(messagesArr);
    localStorage.setItem('faketweet', messageString);
}
export function getUserName(){
    let retrievedName = localStorage.getItem('userName')
    if (retrievedName != null) {
        retrievedName = JSON.parse(retrievedName);
        return retrievedName;
    } else {
        return 'Anonymous';


    }
}
export function setUserName(userName){
    let userNameString = JSON.stringify(userName);
    localStorage.setItem('userName', userNameString);
}