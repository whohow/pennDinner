define(function(require, exports, module) {
    var Event = require('models/Event');

    //---------------------------- localStorage
    var EventsList = Backbone.Collection.extend({
        model: Event
//        comparator: function (event) {
//            return event.get('date');
//        }
//        strategies: {
//            firstName: function (person) { return person.get("firstName"); },
//            lastName: function (person) { return person.get("lastName"); },
//        },
//        changeSort: function (sortProperty) {
//            this.comparator = this.strategies[sortProperty];
//        },
//        initialize: function () {
//            this.changeSort("lastName");
//            console.log(this.comparator);
//            this.changeSort("firstName");
//            console.log(this.comparator);
//        }
    });

    module.exports = EventsList;
});