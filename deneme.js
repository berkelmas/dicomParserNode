const obj = {
  name: "berk",
  sayName: function () {
    const self = this;
    return Array(2)
      .fill(0)
      .map(function (item) {
        self.surname = "elmas";
        return self;
      });
  },
};

console.log(obj.sayName());
