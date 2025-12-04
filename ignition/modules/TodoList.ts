import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TodoListModule", (m) => {
  const todoList = m.contract("TodoListByMetaInside", [], {
    id: "TODO_LIST",
  });

  return { todoList };
});
