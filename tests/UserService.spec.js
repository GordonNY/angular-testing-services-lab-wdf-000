describe('UserService', function () {
	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function ($injector) {
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend
			.when('GET', '/rest/user')
			.respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@gmail.com'});
	}));

	it('should get the user info', function(done) {
		$httpBackend.expectGET('/rest/user');
			 
    UserService
    	.getUser()
    	.then(function (res) {
	      var data = res.data;
	      if (data.email === 'bill@gmail.com' && data.first_name === 'Bill') {
	        done();
	     	}
	     });
    	$httpBackend.flush();
	});

	it('should add up correctly', function () {
		var user;
		UserService
    	.getUser()
    	.then(function (res) {
	      var data = res.data;
	      if (data.email === 'bill@gmail.com' && data.first_name === 'Bill') {
	      	user = data;
	     	}
	     });
    	$httpBackend.flush();

      expect(UserService.createFullName(user)).toEqual(user.first_name + ' ' + user.last_name);
  });
});
