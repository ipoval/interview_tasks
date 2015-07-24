/* priority queue algorithm */

function Patient(name, priority) {
  this.name = name;
  /* 0 - max priority; 5 - min priority */
  this.priority = priority;
}

function Queue() {
  this.dataStore = [];

  this.enq = function(element) {
    this.dataStore.push(element);
    return this;
  };

  this.deq = function() {
    if ( ! this.dataStore.length ) { return; }

    var maxPriorityPatient = this.dataStore[0],
      maxPriority = maxPriorityPatient.priority,
      maxPriorityPatientIdx = 0;

    this.dataStore.forEach(function(patient, idx) {
      if ( patient.priority < maxPriority ) {
        maxPriority = patient.priority;
        maxPriorityPatientIdx = idx;
      }
    })

    return this.dataStore.splice(maxPriorityPatientIdx, 1);
  }
}

var priorityQueue = new Queue();
priorityQueue.enq(new Patient('cat', 3));
priorityQueue.enq(new Patient('dog', 1));
priorityQueue.enq(new Patient('bird', 2));

console.dir(priorityQueue.deq());
