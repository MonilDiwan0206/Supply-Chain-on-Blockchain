
App = {
  Web3Provider: null,
  contracts: {},
  account: '0x0',
  companies: false,

  init: function() {
    return App.initWeb3();
  },

initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      ethereum.enable();
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new
      Web3.providers.HttpProvider('http://localhost:7545');
      ethereum.enable();
      web3 = new Web3(App.web3Provider);
    }
    return App.render();
  },

render: function() {
    //load account data
    web3.eth.getAccounts(function(err,account){
      if(err==null){
        App.account=account;

        alert(account);
        $(document).ready(function(){

        var firebaseConfig = {
          apiKey: "AIzaSyAz8uglwkwBOY372RQhRAVfZ4PZHQUiksU",
          authDomain: "sih2020-39c45.firebaseapp.com",
          databaseURL: "https://sih2020-39c45.firebaseio.com",
          projectId: "sih2020-39c45",
          storageBucket: "sih2020-39c45.appspot.com",
          messagingSenderId: "258564278305",
          appId: "1:258564278305:web:b07f39e6937878579cfb60",
          measurementId: "G-XPP6J8XB3M"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        var dbRef=firebase.database();
        var userRef = dbRef.ref('users');

        $('#RegisterForm').on('submit', function(e){
          e.preventDefault();
          var data = {
              email: $('#email').val(),
              Public: account[0]
            };

            var passwords = {
              password: $('#password').val(),
              cPassword: $('#confirmpassword').val(),
            };
           if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' && data.Public != ''){
              if(passwords.password == passwords.cPassword){
                  firebase.auth().createUserWithEmailAndPassword(data.email,passwords.password).then( function(user){
                    var crtUser = firebase.auth().currentUser;
                    var uid;
                    userRef.child(crtUser.uid).set(data);
                      alert("Successfully created user account");
                    }).catch(function(error){
                      alert(error.message);
                    })
              }

          }
          });

        var root = firebase.database();

          $('#loginForm').on('submit', function(e){
            e.preventDefault();

            var data={
              email:$('#email1').val(),
              password: $('#password1').val()
            };
            if(data.email != '' && data.password !=''){
              firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function(authdata){
                alert("sign in Successfully");

                var userId = firebase.auth().currentUser.uid;
                return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                  if(snapshot.val().Public == account[0]){
                    alert("your account matches");
                  }
                  else{
                    alert("your account doesn't match");
                  };

                  // ...
                });

              }).catch(function(error){
                alert(error);
              })
            }

          });
        })
      }
    })
  }
};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
