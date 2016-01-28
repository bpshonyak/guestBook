Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {

	Meteor.subscribe("tasks");

	Template.guestBook.helpers(
			{
				"messages": function(){
					return Messages.find( {}, {sort: {createdOn: -1} } ) || {};
				}
			}
		);

	Template.guestBook.events(
	  {
		"submit form": function(event){
		  event.preventDefault();

		  var name = $(event.target).find("input[id = name]");
		  var msg = $(event.target).find("textarea[id = message]");

			Messages.insert(
				{
					name: name.val(),
					message: msg.val(),
					createdOn: Date.now()
				});

			name.val("");
			msg.val("");

		}
	  }
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {

	  Meteor.publish("messages", function () {
		  return Messages.find();
	  });

  });
}
