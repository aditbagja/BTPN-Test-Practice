const tandaKurungSeimbang = (request) => {
  let result = [];

  for (let i = 0; i < request.length; i++) {
    let temp = request[i];

    if (temp == "(" || temp == "[" || temp == "{") {
      result.push(temp);
      continue;
    }

    let tempCheck;
    switch (temp) {
      case ")":
        tempCheck = result.pop();
        if (tempCheck == "{" || tempCheck == "[") return false;
        break;

      case "}":
        tempCheck = result.pop();
        if (tempCheck == "(" || tempCheck == "[") return false;
        break;

      case "]":
        tempCheck = result.pop();
        if (tempCheck == "(" || tempCheck == "{") return false;
        break;
    }
  }

  return true;
};

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Masukan inputan: ", (input) => {
  console.log(input);
  if (tandaKurungSeimbang(input)) {
    console.log("Seimbang");
  } else {
    console.log("Tidak Seimbang");
  }
  readline.close();
});
