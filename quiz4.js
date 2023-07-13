function contact(name, number) {
    this.name = name;
    this.number = number;
  }
  
  contact.prototype.print = function() {
    console.log(this.name + ": " + this.number);
  };
  
  var a = new contact("David", 12345);
  var b = new contact("Amy", 987654321);
  a.print(); // output: David: 12345
  b.print(); // output: Amy: 987654321