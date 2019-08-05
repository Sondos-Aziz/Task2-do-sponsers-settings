
var myApp =angular.module('myApp',["ngRoute"]);
myApp.config(function($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: "views/index.blade.php",
            controller: "infoUserController"
        })
        .when("/create",{
            templateUrl : "views/sponsor/create.blade.php",
            controller: "createUserController"
        })
        .when("/edit/:id",{
        templateUrl : "views/sponsor/edit.blade.php",
        controller: "editUserController"
    })
        .when("/search",{
        templateUrl : "views/sponsor/search.blade.php",
        controller: "searchUserController"
    })
        .otherwise({
            template: "<h1>None</h1><p>Nothing has been selected</p>"
        });

});

/////////
myApp.controller('infoUserController', function ($scope, $http ) {

    $scope.users = [];
    // List users
    $scope.loadUsers = function () {
        $http.get('/sponsor')
            .then(function success(e) {
                $scope.users = e.data.users;
            });
    };
    $scope.loadUsers();


    ////////////////////
//make the delete button
    $scope.confirmDelete = function(id) {

        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            var url='/sponsor/' + id;

            $http.delete(url).then(function (data) {

                // console.log(data);
                    location.reload();
                // $scope.loadUsers();

            }, function (response) {
                // console.log(data);
                alert('Unable to delete');

            });
        } else {
            return false;
        }
    };


});

/////////////////
//2. show the create form
myApp.controller('createUserController', function ($scope, $http ,$window) {

    $scope.user = {
        firstName: '',
        secondName: '',
        thirdName: '',
        fourthName: '',
        email: '',
        password: '',
        governorate: '',
        city: '',
        neighborhood: '',
        mobile: '',
        nationality: '',
        countryOfResidence: '',
        definitionType: '',
        phone1: '',
        phone2: '',
        address: '',
        identificationNum: '',
        type: '',
        contactPerson: '',
    };
    $scope.countries = [];
    $scope.cities = [];
    $scope.govs = [];
    $scope.neighs = [];
    $scope.nationalities = [];

    $http.get('/sponsor/create')
        .then(function success(e) {
            // console.log('get create');
            $scope.user = e.data.users;
            $scope.countries = e.data.countries;
            $scope.cities = e.data.cities;
            $scope.govs = e.data.govs;
            $scope.neighs = e.data.neighs;
            $scope.nationalities = e.data.nationalities;
        });

// Add new User
    $scope.addSponsor = function () {
        if ($scope.type == 'شخص') {
            $http.post('/sponsor', {
                firstName: $scope.firstName,//the right direction from ng-model that is exist in view
                secondName: $scope.secondName,
                thirdName: $scope.thirdName,
                fourthName: $scope.fourthName,
                email: $scope.email,
                password: $scope.password,
                definitionType: $scope.definitionType,
                identificationNum: $scope.identificationNum,
                governorate: $scope.governorate,
                city: $scope.city,
                neighborhood: $scope.neighborhood,
                address: $scope.address,
                phone1: $scope.phone1,
                mobile: $scope.mobile,
                nationality: $scope.nationality,
                countryOfResidence: $scope.countryOfResidence,
                type: $scope.type,
            }).then(function success(e) {
                $window.location = '#!/';
            });
//organaization
        } else if ($scope.type == 'مؤسسة') {
            $http.post('/sponsor', {
                firstName: $scope.firstName,
                secondName: $scope.secondName,
                thirdName: $scope.thirdName,
                fourthName: $scope.fourthName,
                email: $scope.email,
                password: $scope.password,
                phone1: $scope.phone1,
                phone2: $scope.phone2,
                address: $scope.address,
                contactPerson: $scope.contactPerson,
                type: $scope.type,
                countryOfResidence: $scope.countryOfResidence,
            }).then(function success(e) {
                $window.location = '#!/';
            });
        }

    };
});
/////edit
    myApp.controller('editUserController', function ($scope, $http ,$window,$routeParams) {

        $scope.user = {
            firstName: '',
            secondName: '',
            thirdName: '',
            fourthName: '',
            countryOfResidence: '',
            phone1: '',
            address: '',
        };

        $scope.countries=[];

    $scope.edit = function (id) {
        $http.get('/sponsor/' + $routeParams.id+'/edit')
            .then(function success(e) {
                $scope.user = e.data.user;
                $scope.countries = e.data.countries;
            });
    }
    $scope.edit();

    $scope.update = function (id) {
            $http.put('/sponsor/'+ $scope.user.id, {

                // firstName: $scope.firstName,
                // secondName: $scope.secondName,
                // thirdName: $scope.thirdName,
                // fourthName: $scope.fourthName,
                // address: $scope.address,
                // phone1: $scope.phone1,
                // countryOfResidence: $scope.countryOfResidence
                firstName: $scope.user.firstName,
                secondName: $scope.user.secondName,
                thirdName: $scope.user.thirdName,
                fourthName: $scope.user.fourthName,
                address: $scope.user.address,
                phone1: $scope.user.phone1,
                countryOfResidence: $scope.user.countryOfResidence

            }).then(function success(response) {
                    console.log(response);
                    $window.location.href = '#!/';

                }, function error(response) {
                    console.log(response);
                    alert('Submit Error');
                }
                );
            };

});

//searchUserController
myApp.controller('searchUserController', function ($scope, $http ,$window) {

    $scope.users = {
        firstName: '',
        secondName: '',
        thirdName: '',
        fourthName: '',
        email: '',
        password: '',
        governorate:'',
        city:'',
        neighborhood:'',
        mobile: '',
        nationality:'',
        countryOfResidence:'',
        definitionType:'',
        phone1: '',
        phone2: '',
        address: '',
        identificationNum: '',
        type:'',
        contactPerson:'',
    };
    $scope.countries =[];
    $scope.cities =[];
    $scope.govs =[];
    $scope.neighs =[];
    $scope.nationalities =[];

    $http.get('/search')
        .then(function success(e) {
            $scope.users = e.data.users;
            $scope.countries = e.data.countries;
            $scope.cities = e.data.cities;
            $scope.govs = e.data.govs;
            $scope.neighs = e.data.neighs;
            $scope.nationalities = e.data.nationalities;
        });

    $scope.doSearch= function () {
        if ($scope.type == 'شخص') {
            console.log('search');
            $http.post('/search', {
                firstName: $scope.firstName,//the right direction from ng-model that is exist in view
                secondName: $scope.secondName,
                thirdName: $scope.thirdName,
                fourthName: $scope.fourthName,
            }).then(function success(e) {
                $window.location ='#!/search';
            }).then(function error(e){
                alert('ffffffffffff');
            });
        }
    }


});
