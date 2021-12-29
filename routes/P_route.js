const express = require('express');
const router = express.Router();
const person = require('../models/person');
const arrayOfPeople = require('../arrayOfPeople');



// Create and Save a Record of a Model

let ahmed = new person({ name: "Ahmed", age: 88, favouriteFoods: ['Pizza'] });
ahmed.save((err, data) => {
    if (err) throw err;
    else console.log(`the person is created and saved : ${data}`)
})

// Creating Many Records with model.create()

person.create(arrayOfPeople, (err, CreatedPeople) => {
    if (err) throw err; 
    else console.log(`Records are created successfully : ${CreatedPeople}`);
})

//Finding all the people having a given name using the model.find()

person.find({ name: 'Sarra' }, (err, data) => {
    if (err) throw err;
    else console.log(`People found : ${data}`);
})

//Finding Just one person which has a certain food in the person's favorites using Model.findOne();


const findByFood = (food) => {
  //Using the function argument food as a search key !!!!!?
  person.findOne({ favouriteFoods: { $all: [food] } }, (err, data) => {
    if (err) throw err;
    else console.log(`the person was found by his favourite food : ${data}`);
  });
}
findByFood();

//Finding the (only!!) person having a given _id using model.findById()

const findById = (personId) => {
  //using the function argument personId as the search key !!!!!?
  person.findById(personId, (err, data) => {
    if (err) throw err;
    else console.log(`This person got found by his Id ${data}`);
  });
}
findById();

//Performing Classic Updates by Running Find, Edit, then Save
//parameter personId as a search key!??

const findEditThenSave = (personId) => {
    let addedFood = "hamburger";
    person.findById("61cb996f46d1d3862ce2e52e", (err, data) => {
      if (err) throw err;
      else {
        data.favouriteFoods.push(addedFood); //if i dont use an exsting id in the db an error will occur (Cannot read properties of null (reading 'favouriteFoods'))
        console.log("find by id and edit", data);
        data.save((err, newdata) => {
          if (err) throw err;
          else {
            console.log(`updated ${newdata}`);
          }
        });
      }
    });
}
findEditThenSave();

//Performing New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName) => {
    const personAge = 20;
    person.findOneAndUpdate({ name: personName }, { age: personAge }, { new: true }, (err, data) => {
        if (err) throw err;
        else {
            console.log(`the person was found by name and updated his age to 20 : ${data}`)
        }
    })
}
findAndUpdate();

//Deleting One Document Using model.findByIdAndRemove
const removeById = (personId) => {
    person.findByIdAndRemove(personId, (err, data) => {
        if (err) throw err
        else {
            console.log(`person was found by id and got removed ${data}`)
        }
    })
}
removeById();

//Deleting Many Documents with model.remove()
const removeMany = () => {
    person.remove({ name: "Mary" }, (err, JASONStatus) => {
      //the JSON object containing the outcome of the operation
      if (err) throw err;
      else {
        console.log(`Deleted all the people whose name is Mary ${JASONStatus}`);
      }
    });
}
removeMany();

//Chain Search Query Helpers to Narrow Search Results

const Chain = () => {
    person.find({ favouriteFoods: { $all: ["burrito"] } }).sort({ name: 1 }).limit(2).select({ age: false }).exec((err, data) => {
        if (err) throw err
        else console.log(`search result ${data}`)
    })
}

Chain();



module.exports = router;