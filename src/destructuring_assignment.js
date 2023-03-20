const object = {
  state: {
    infomation: {
      name: "hoon",
      lang: ["html", "css", "js"]
    }
  },
  val: 3
};

const { name, lang } = object.state.infomation;
const { val } = object;

const {
  state: {
    infomation: {
      name: na,
      lang: [first]
    }
  }
} = object;

console.log(name, lang, val, na, first);
