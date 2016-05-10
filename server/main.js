import { Meteor } from 'meteor/meteor';
import { Toodoos } from '../imports/toodoos.js';

Meteor.startup(() => {
// code to run on server at startup
});

Meteor.publish("toodoos", function()
{
    return Toodoos.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId}
      ]
    });
})