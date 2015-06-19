Template.quiz1.helpers({
	projectData:function(){
		return Projects.find({},{sort:{projectName:1,firstName:1,lastName:1}}).fetch();
	}
});

Template.quiz1.events({
	'submit #addProjectForm':function(event){
		event.preventDefault();

		Projects.insert({
			projectName:projectName.value,
			firstName:firstName.value,
			lastName:lastName.value,
			projectURL:projectURL.value,
			projectRepo:projectRepo.value
		});

		projectName.value = '';
		firstName.value = '';
		lastName.value = '';
		projectURL.value = '';
		projectRepo.value = '';
	},
	'click .delete-entry':function(event){
		Projects.remove(this._id);
	}
});