if (Meteor.isClient) {
  Template.guestBook.events(
      {
        "submit form": function(event){
          event.preventDefault();

          var name = $(event.target).find("input[id = name]");
          var msg = $(event.target).find("textarea[id = message]");

          alert(name.val() + ": " + msg.val());
        }
      }
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
