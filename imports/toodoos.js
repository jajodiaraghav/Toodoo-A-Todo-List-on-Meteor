import { Mongo } from 'meteor/mongo';

export const Toodoos = new Mongo.Collection("toodoos");

//==============Toodoo Methods(Add, Update, Delete)===========
Meteor.methods({

  addToodoo: function(title)
  {
    Toodoos.insert({
      title: title,
      createdAt: new Date(),
      owner: this.userId
    });
  },

  updateToodoo: function(id, checked)
  {
    var td = Toodoos.findOne(id);

    if(td.owner !== this.userId)
    {
      throw new Meteor.Error("Not Authorized");
    }
    Toodoos.update(id, {$set: {checked: checked}});
  },

  deleteToodoo: function(id)
  {
    var td = Toodoos.findOne(id);

    if(td.owner !== this.userId)
    {
      throw new Meteor.Error("Not Authorized");
    }
    Toodoos.remove(id);
  },

  setPrivate: function(id, private)
  {
    var td = Toodoos.findOne(id);

    if(td.owner !== this.userId)
    {
      throw new Meteor.Error("Not Authorized");
    }
    Toodoos.update(id, {$set: {private: private}});
  }

})
// ===========================================================