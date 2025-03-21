const contractAddress = "0xb49b64eDF5916eeBD916d64f37CdCdaE52f71895 ";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Hours",
				"type": "uint256"
			}
		],
		"name": "HoursLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_volunteer",
				"type": "address"
			}
		],
		"name": "getHours",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_volunteer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_hours",
				"type": "uint256"
			}
		],
		"name": "logHours",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "volunteerHours",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_volunteer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_hours",
                "type": "uint256"
            }
        ],
        "name": "logHours",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_volunteer",
                "type": "address"
            }
        ],
        "name": "getHours",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let contract;
let accounts = [];

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await ethereum.request({ method: "eth_requestAccounts" });
            document.getElementById("wallet-address").innerText = `Connected: ${accounts[0]}`;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    } else {
        alert("Please install MetaMask.");
    }
}

async function logHours() {
    if (!contract) return alert("Connect wallet first!");

    const volunteerAddress = document.getElementById("volunteerAddress").value;
    const hours = document.getElementById("hours").value;

    if (!volunteerAddress || !hours) return alert("Fill all fields.");

    try {
        await contract.methods.logHours(volunteerAddress, hours)
            .send({ from: accounts[0] });
        alert(`Logged ${hours} hours for ${volunteerAddress}`);
    } catch (error) {
        console.error(error);
        alert("Transaction failed.");
    }
}

async function getHours() {
    if (!contract) return alert("Connect wallet first!");

    const checkAddress = document.getElementById("checkAddress").value;
    if (!checkAddress) return alert("Enter an address.");

    try {
        const hours = await contract.methods.getHours(checkAddress).call();
        document.getElementById("displayHours").innerText = `Total Hours: ${hours}`;
    } catch (error) {
        console.error(error);
        alert("Could not fetch hours.");
    }
}
