Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {

	Meteor.subscribe("tasks");

	Template.guestBook.helpers(
			{
				"messages": function(){
					return Messages.find( {}, {sort: {createdOn: -1} } ) || {};
				},
				"formatDate": function(date){
					var newDate = moment(date).format('YYYY-MM-DD');
					console.log(newDate);
					return newDate;
				}
			}
		);

	Template.guestBook.events(
	  {
		"submit form": function(event){
		  event.preventDefault();

		  var name = $(event.target).find("input[id = name]");
		  var msg = $(event.target).find("textarea[id = message]");

			if(name.val().length > 0 && msg.val().length > 0){
				Messages.insert(
						{
							name: name.val(),
							message: msg.val(),
							createdOn: Date.now()
						});

				name.val("");
				msg.val("");
			} else {
				//if(msg.val().length < 1){
					msg.addClass("has-error");
				//}
				if(name.val().length < 1){
					name.addClass("has-error");
				}
			}

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
