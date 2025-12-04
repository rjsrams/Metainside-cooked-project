// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TodoListByMetaInside
 * @dev A decentralized todo list where each user owns their tasks
 * Dev By MetaInside
 */
contract TodoListByMetaInside {
    struct Task {
        uint256 id;
        string content;
        bool completed;
        uint256 createdAt;
    }

    mapping(address => Task[]) private userTasks;
    mapping(address => uint256) private taskIdCounter;

    event TaskCreated(address indexed user, uint256 indexed taskId, string content, uint256 createdAt);
    event TaskCompleted(address indexed user, uint256 indexed taskId, bool completed);
    event TaskDeleted(address indexed user, uint256 indexed taskId);

    function createTask(string calldata _content) external {
        require(bytes(_content).length > 0, "Task content cannot be empty");
        require(bytes(_content).length <= 500, "Task content too long");

        uint256 taskId = taskIdCounter[msg.sender];
        taskIdCounter[msg.sender]++;

        Task memory newTask = Task({
            id: taskId,
            content: _content,
            completed: false,
            createdAt: block.timestamp
        });

        userTasks[msg.sender].push(newTask);
        emit TaskCreated(msg.sender, taskId, _content, block.timestamp);
    }

    function toggleTask(uint256 _taskIndex) external {
        require(_taskIndex < userTasks[msg.sender].length, "Task does not exist");

        userTasks[msg.sender][_taskIndex].completed = !userTasks[msg.sender][_taskIndex].completed;

        emit TaskCompleted(
            msg.sender, 
            userTasks[msg.sender][_taskIndex].id, 
            userTasks[msg.sender][_taskIndex].completed
        );
    }

    function deleteTask(uint256 _taskIndex) external {
        require(_taskIndex < userTasks[msg.sender].length, "Task does not exist");

        uint256 taskId = userTasks[msg.sender][_taskIndex].id;
        uint256 lastIndex = userTasks[msg.sender].length - 1;
        
        if (_taskIndex != lastIndex) {
            userTasks[msg.sender][_taskIndex] = userTasks[msg.sender][lastIndex];
        }
        userTasks[msg.sender].pop();

        emit TaskDeleted(msg.sender, taskId);
    }

    function getMyTasks() external view returns (Task[] memory) {
        return userTasks[msg.sender];
    }

    function getMyTaskCount() external view returns (uint256) {
        return userTasks[msg.sender].length;
    }

    function getTask(uint256 _taskIndex) external view returns (Task memory) {
        require(_taskIndex < userTasks[msg.sender].length, "Task does not exist");
        return userTasks[msg.sender][_taskIndex];
    }
}
