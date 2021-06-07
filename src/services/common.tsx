function isPalindroom(w: any): any {

    if (typeof w === 'number')
        throw Error("this is not a string")

    for(let i=0; i < w.length/2; i++){
        if(w[i] !== w[w.length - 1 - i]){
            return false;
        }
    }

    return w;
}

export default isPalindroom;

console.log(isPalindroom(12)) // create a compile time error instead of runtime error

console.log(isPalindroom("")) // outputs false

console.log(isPalindroom("meetsysteem")) // outputs the palindrome

console.log(isPalindroom("thisisNotaPalindrome")) // output false
