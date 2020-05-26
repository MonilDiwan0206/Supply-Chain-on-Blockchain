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
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      ethereum.enable();
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Tenders.json", function(tenders) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Tenders = TruffleContract(tenders);
      // Connect provider to interact with contract
      App.contracts.Tenders.setProvider(App.web3Provider);


      App.listenForEvents();

      return App.render();
    });
  },

  //Listen for events emitted from the contract
  listenForEvents: function() {
    
    App.contracts.Tenders.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.tenderSubmitted({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var tenderInstance;
    var loader = $("#loader");
    var content = $("#content");
    
    // Load account data
    web3.eth.getAccounts(function(err, account) {
      if (err === null) {

        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });



    // Load contract data
    App.contracts.Tenders.deployed().then(function(instance) {
      tenderInstance = instance;
      return tenderInstance.tenderCount();
    }).then(function(tenderCount) {
      var tenderDisplay = $('#tenders');

      var cCount = parseInt(tenderCount,10);
      for (var i = 1; i <= cCount; i++) {
        tenderInstance.tenders(i).then(function(tender) {
          var id = tender[0];
          var scope = tender[1];
          var startDate = tender[2];
          var endDate = tender[3];
          var name = tender[4];
          var phoneNo = tender[5];
          var email = tender[6];
          var sender = tender[7];


          var template = "<div class='card blue-grey darken-1'>";
          template += "<div class='card-content white-text'>";
          template += "<span class='card-title' id='title'>"+scope+"</span><hr></div>";
          template += "<div class='card-content white-text'><table><thead><td>Start Date:</td><td>End Date:</td></thead><tr>";
          template += "<td id='startDate'>"+startDate+"</td>";
          template += "<td id='endDate'>"+endDate+"</td>";
          template += "</tr> </table> </div>";
          template += "<div class='card-action'><a href='#'>Bid for it</a></div></div>";
          tenderDisplay.append(template);
          
          // Render candidate Result
          //var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
         // candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          //var candidateOption = "<option value='" + id + "' >" + name + "</ option>";
          //candidatesSelect.append(candidateOption);
        });
      }
      return tenderInstance.quotationCount();
    }).then(function(quotationCount) {
      // Do not allow a user to vote
      var bidders = $('#bidders');
      var cCount = parseInt(quotationCount,10);
      for(var i = 1;i <= cCount; i++){
        tenderInstance.quotations(i).then(function(quotation){
          var id = quotation[0];
          var docNo = quotation[1];
          var desc = quotationCount[2];
          var date = quotation[3];
          var details = quotation[4];
          var price = quotation[5];
          var sender = quotation[6];
          
          var template = "<tr>";
          template=template+"<th scope='row' id='docNo'>"+docNo+"</th>";
          template=template+"<td id='desc'>"+desc+"</td>";
          template=template+"<td><a class='btn btn-md btn-warning' href='showQuotation.html'>Show Quotation</a></td>";
          template=template+"<td><a class='btn btn-md btn-success' href=''>Confirm</a></td>";
          bidders.append(template);


        });

      }
      
    }).catch(function(error) {
      console.warn(error);
    });
  },



  addTenders: function() {
    var scope = String($('#comments').val());
    var startDate = String($('#bidStartDate').val());
    var endDate = String($('#dateofbirth').val());
    var contactName = String($('#name').val());
    var contactEmail = String($('#email').val());
    var contactNumber = String($('#number').val());

    //alert(scope+"\n"+startDate+"\n"+endDate+"\n"+contactName+"\n"+contactNumber+"\n"+contactEmail);
    App.contracts.Tenders.deployed().then(function(instance) {

      return instance.addTender(scope, startDate, endDate, contactName, contactNumber, contactEmail, { from: String(App.account) });
    }).then(function(result) {
      // Wait for votes to update
      
    }).catch(function(err) {
      alert(App.account);
      console.error(err);
    });
  },


  bid: function() {
    
    var docNo = String($('#docNo').val());
    var desc = String($('#desc').val());
    var bidDueDate = String($('#bidDueDate').val());
    var quotation = String($('#quotation').val());
    var totalprice = String($('#totalprice').val());

    App.contracts.Tenders.deployed().then(function(instance) {

      return instance.bidTender(docNo, desc, bidDueDate, quotation, totalprice, { from: String(App.account), value: 2 });
    }).then(function(result) {
      // Wait for votes to update
      alert(result);

      
    }).catch(function(err) {
      alert(err);
      console.error(err);
    });

    
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});





