pragma solidity ^0.5.0;

contract Tenders{

	//Model a Tender
	struct Tender{
		uint id;
		string scope;
		string startDate;
		string endDate;
		string name;
		string phoneNo;
		string email;
		address payable sender;
	}

	//Model the Qutation
	struct Quotations{
		uint id;
		uint tenderId;
		uint docNo;
		string description;
		string date;
		string details;
		uint price;
		address payable bidder;

	}

	uint public quotationCount = 0;
	mapping (uint => Quotations) public quotations;
	
	mapping(address => bool) public companies;

	uint public tenderCount = 0;
	mapping(uint => Tender) public tenders;

	event tenderSubmitted(
		uint id,
		string scope,
		string startDate,
		string endDate,
		string name,
		string phoneNo,
		string email,
		address payable sender
		);


	event bidded(
		uint id,
		uint tenderId,
		uint docNo,
		string description,
		string date,
		string details,
		uint price,
		address payable bidder
		);

	function addTender(string memory _scope, string memory _startDate, string memory _endDate, string memory _name, string memory _phoneNo, string memory _email) public {

		require(bytes(_scope).length > 0);
		require(bytes(_name).length > 0);
		require(bytes(_phoneNo).length == 10);
		require(bytes(_email).length > 0);
		tenderCount++;
		tenders[tenderCount] = Tender(tenderCount, _scope, _startDate, _endDate, _name, _phoneNo, _email, msg.sender);

		emit tenderSubmitted(tenderCount, _scope, _startDate, _endDate, _name, _phoneNo, _email, msg.sender);

	}	

	// function addItem ( string memory _itemName, uint _itemPrice) public {
	// 	require(bytes(_itemName).length > 0);
	// 	require(_itemPrice > 0);
	// 	itemCount++;
	// 	quotationsItems[itemCount] = QuotationsItems(itemCount, _itemName, _itemPrice);	
	// 	emit itemAdded(itemCount, _itemName, _itemPrice);	
	// }
	
	function bidTender (uint _tenderId, uint _docNo, string memory _description, string memory _date, string memory _details, uint _price) public payable {


		Tender memory _tender = tenders[_tenderId];
		address payable _seller = _tender.sender;
		require (bytes(_description).length > 0);

		require (bytes(_details).length > 0);
		require(_price > 0);
		require(msg.value >= 2);

		require(!companies[msg.sender]);

		companies[msg.sender] = true;

		quotationCount++;
		address(_seller).transfer(msg.value);

		quotations[quotationCount] = Quotations(quotationCount, _tenderId, _docNo, _description, _date, _details, _price, msg.sender);
		emit bidded(quotationCount, _tenderId, _docNo, _description, _date, _details, _price, msg.sender);
		
	}
	
}
