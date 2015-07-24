/*
 * queue of dancers algorithm
 */
function Dancer(name, sex) {
  this.name = name;
  this.sex = sex;
}

function getDancers(males, females) {
  var names = read("dancers.txt").split("\n");
  for (var i = 0; i < names.length; ++i) {
    names[i] = names[i].trim();
  }

  for (var i = 0; i < names.length; ++i) {
    var dancer = names[i].split(" "),
      sex = dancer[0],
      name = dancer[1];

    if (sex == "F") {
      femaleDancers.enqueue(new Dancer(name, sex));
    }
    else {
      maleDancers.enqueue(new Dancer(name, sex));
    }
  }
}

function dance(males, females) {
  print("The dance partners are: \n");
  while (!females.empty() && !males.empty()) {
    person = females.dequeue();
    putstr("Female dancer is: " + person.name);
    person = males.dequeue();
    print(" and the male dancer is: " + person.name);
  }
  print();
}

// Test
var maleDancers = new Queue(),
 femaleDancers = new Queue();

getDancers(maleDancers, femaleDancers);
dance(maleDancers, femaleDancers);

if (!femaleDancers.empty()) {
  print(femaleDancers.front().name + " is waiting to dance.");
}

if (!maleDancers.empty()) {
  print(maleDancers.front().name + " is waiting to dance.");
}
