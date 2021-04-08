# Ziv's Elevator README

## Description

I created this app using React.js Mobx and JS.
All the logic and state is in the model.

## The Model

### Board class

- **_floorNum_** - type: number, the number of floors in the building.
- **_elvatorsNum_** - type: number, the number of floors in the building.
- **_board_** - type: two-dimensional array, the floor numbers of the elevators.
- **_\_generateBoard()_** - type: function, generated the board.
- **_elevatorsArr_** - type: array, instances of elevator class.
- **_\_generateElevators()_** - type: function, creates instances of elevators and inserts them to the elevatorsArr array.
- **_placeElevator(prevoiusFloor, currentFloor, id)_** - type: function, places an elevator on the board.
- **_placeElevatorsOnStart()_** - type: function, places all elevators on the board for the first time, uses placeElevator.
- **_queue_** - type: array, when all of the elevators are busy the queue will contain a waitlist of floors.
- **_addToQueue(floorNum)_** - type: function, adds the floor to the queue.
- **_nextFromQueue()_** - type: function, returns the next floor from queue.
- **_sendElevator(floorNum)_** - type: function, add an elevator to the queue and order an elevator.
- **_orderElevator(floorNum)_** - type: function, finds the closest elevator and envokes its goTo() function with the next elevator in the queue.
- **_availableElevators()_** - type: function, return array of id’s & currentFloor’s of available elevators sorted by currentFloor.

### Elevator class

- **Id** - type: number, unique number.
- **directionIsUp** - type: boolean.
- **previousFloor** - type: number, the previous location of the elevator.
- **currentFloor** - type: number, the current location of the elevator.
- **targetFloor** - type: number, the destination floor number.
- **movementEnum** - type:enum Object, options: idle,moving, suspended.
- **changeMovementStatus(status)** - type: function.
- **goTo(floorNum, board)** - type: function, receive the target floor number. Changes the status of the elevator(isAvailable) to false.
- **suspend()** - type: function, changes elevator status upon arrival.
- **move()** - type: function, changes current floor according to directionIsUp until arrival to targetFloor.
- **MoveOneFloor()** - type: function, updates floor location by one floor and place it on board.

### Floor Class

- **isWaiting** - type: boolean.
- **assignedElevator** - type: object, contains the assigned elevator’s instance.
- **setElevator()**- type: function, sets assigned elevator.
- **clearElevator()**- type: function, removes assigned elevator.

### Constants:

- **suspension** - time to wait after elevator arrived.
- **moveSpeed** - interval.
