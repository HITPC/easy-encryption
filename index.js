class easyEncryption {
  constructor(secret = "initial") {
    if (typeof secret !== "string") {
      throw new Error("wrong type of secret! Need a String!");
    }
    this.secret = secret;
    let t = 0;
    for (let i = 0; i < secret.length; ++i) {
      t += secret.charCodeAt(i);
    }
    this.secretCount = t;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomChar() {
    let key = this.getRandom(0, 25);
    let part = this.getRandom(0, 1);
    if (part == 1) {
      return String.fromCharCode(97 + key);
    } else {
      return String.fromCharCode(65 + key);
    }
  }

  getChar(index, part = "big") {
    if (part === "big") {
      return String.fromCharCode(65 + index);
    } else {
      return String.fromCharCode(97 + index);
    }
  }

  doEncode(toEncode) {
    if(typeof toEncode !== 'string' ){
      throw new Error("wrong type of toEncode! need a string!");
    }
    let res = "";
    res += this.getRandomChar();
    res += this.getRandomChar();
    let len = toEncode.length;
    if (len < 10) {
      res += "a";
    } else if (len < 20) {
      res += "b";
      len -= 10;
      res += this.getRandomChar();
    } else {
      res += "c";
      len -= 20;
      res += this.getRandomChar();
      res += this.getRandomChar();
    }
    res += this.getChar(len, "small");
    for (let i = 0; i <= len; ++i) {
      res += this.getRandomChar();
    }
    let temp = this.secretCount.toString();
    let index = 0,
      i = 0;
    while (i < toEncode.length) {
      res += toEncode.charAt(i);
      let gap = Number.parseInt(temp.charAt(index));
      for (let j = 0; j < gap; ++j) {
        res += this.getRandomChar();
      }
      ++index;
      if (index >= temp.length) {
        index = 0;
      }
      ++i;
    }

    while (res.length <= 50) {
      res += this.getRandomChar();
    }
    return res;
  }

  doDecode(toDecode) {
    if(typeof toDecode !== 'string' ){
      throw new Error("wrong type of toDecode! need a string!");
    }
    if(toDecode.length < 50){
      throw new Error("can not decode! please check whether the str is right!");
    }
    let firstPoint;
    let leave;
    let secondPoint;
    let realLeave;
    let realLength;
    let i = 0; 
    let index = 0; 
    let temp = ""; 
    let secretIndex = 0; 
    let gap;
    let secretCS = this.secretCount.toString();
    firstPoint = toDecode.charAt(2);
    leave =
      firstPoint === "a"
        ? 1
        : firstPoint === "b"
        ? 2
        : firstPoint === "c"
        ? 3
        : 0;
    secondPoint = toDecode.charAt(2 + leave);
    realLeave = secondPoint.charCodeAt() - "a".charCodeAt();
    realLength = (leave - 1) * 10 + realLeave;
    index += 2 + leave + 1 + realLeave + 1; 
    while (i < realLength) {
      temp += toDecode.charAt(index);
      ++i;
      gap = Number.parseInt(secretCS.charAt(secretIndex));
      index += gap + 1;
      ++secretIndex;
      if (secretIndex >= secretCS.length) {
        secretIndex = 0;
      }
    }
    return temp;
  }
}

export default easyEncryption;