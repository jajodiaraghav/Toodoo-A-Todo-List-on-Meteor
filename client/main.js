import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Toodoos } from '../imports/toodoos.js';

import './main.html';

Meteor.subscribe("toodoos");

// =========Show or hide checked Todo items========
Template.body.helpers({

    toodoos: function()
    {
      if(Session.get("hideFinished"))
      {
        return Toodoos.find({checked: {$ne: true}});	// Gets only Unchecked items
      }
      else
      {
        return Toodoos.find();	// Gets all the items
      }
    },
    hideFinished: function()
    {
      return Session.get("hideFinished");
    }

  });
// ===========================================================

//================Add new Item/Change 'Hide Done'=============
Template.body.events({

	"submit .new-toodoo": function(event)
	{
	  var title = event.target.title.value;
	  Meteor.call("addToodoo", title);
	  event.target.title.value = "";
	  return false;
	},
	'change .hide-finished': function(event)
	{
	  Session.set("hideFinished",event.target.checked);
	}

});
// ===========================================================

//================Returns Current Owner======================
Template.toodoo.helpers({

    isOwner: function()
    {
        return this.owner === Meteor.userId();
    }

});
// ===========================================================

//===================Update and Delete Events=================
Template.toodoo.events({

	"click .toggle-checked": function()
	{
	  Meteor.call("updateToodoo",this._id, !this.checked);
	},
	"click .delete": function()
	{
	  Meteor.call("deleteToodoo", this._id);
	},
	"click .toggle-private": function()
	{
	  Meteor.call("setPrivate",this._id, !this.private);
	}

});
// ===========================================================