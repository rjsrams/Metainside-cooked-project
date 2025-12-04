// Contract Address - Update after deployment
export const TODO_LIST_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export const TODO_LIST_ABI = [
  {
    type: "function",
    name: "createTask",
    inputs: [{ name: "_content", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "toggleTask",
    inputs: [{ name: "_taskIndex", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deleteTask",
    inputs: [{ name: "_taskIndex", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMyTasks",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct TodoListByMetaInside.Task[]",
        components: [
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "content", type: "string", internalType: "string" },
          { name: "completed", type: "bool", internalType: "bool" },
          { name: "createdAt", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMyTaskCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTask",
    inputs: [{ name: "_taskIndex", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TodoListByMetaInside.Task",
        components: [
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "content", type: "string", internalType: "string" },
          { name: "completed", type: "bool", internalType: "bool" },
          { name: "createdAt", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "TaskCreated",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "taskId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "content", type: "string", indexed: false, internalType: "string" },
      { name: "createdAt", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TaskCompleted",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "taskId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "completed", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TaskDeleted",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "taskId", type: "uint256", indexed: true, internalType: "uint256" },
    ],
    anonymous: false,
  },
] as const;
