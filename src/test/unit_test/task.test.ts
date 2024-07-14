import sinon from "sinon";
import expect from "expect";
import {
  getTasks,
  getTaskById,
  deleteTaskById,
  createTask,
  updateTaskById,
} from "../../service/task.service";
import * as taskModel from "../../model/task.model";
import { ITask } from "../../interfaces/ITask.interface";
import { STATUS } from "../../interfaces/status.interface";

describe("Task Service Test Suite", () => {
  describe("getTasks", () => {
    let taskModelGetTasksFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelGetTasksFromDBStub = sinon.stub(taskModel, "getTasksFromDB");
    });

    afterEach(() => {
      taskModelGetTasksFromDBStub.restore();
    });

    it("Should return tasks for the user", () => {
      const tasks: ITask[] = [
        {
          id: 1,
          name: "Test Task",
          status: STATUS.ONGOING,
          userId: 1,
        },
      ];

      taskModelGetTasksFromDBStub.returns(tasks);

      const response = getTasks(1);

      expect(response).toStrictEqual(tasks);
    });
  });

  describe("getTaskById", () => {
    let taskModelGetTaskByIdFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelGetTaskByIdFromDBStub = sinon.stub(taskModel, "getTaskByIdFromDB");
    });

    afterEach(() => {
      taskModelGetTaskByIdFromDBStub.restore();
    });

    it("Should return task by id for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Test Task",
        status: STATUS.ONGOING,
        userId: 1,
      };

      taskModelGetTaskByIdFromDBStub.returns(task);

      const response = getTaskById(1, 1);

      expect(response).toStrictEqual(task);
    });
  });

  describe("deleteTaskById", () => {
    let taskModelDeleteTaskByIdFromDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelDeleteTaskByIdFromDBStub = sinon.stub(taskModel, "deleteTaskByIdFromDB");
    });

    afterEach(() => {
      taskModelDeleteTaskByIdFromDBStub.restore();
    });

    it("Should delete task by id for the user", () => {
      taskModelDeleteTaskByIdFromDBStub.returns(undefined);

      deleteTaskById(1, 1);

      expect(taskModelDeleteTaskByIdFromDBStub.callCount).toBe(1);
      expect(taskModelDeleteTaskByIdFromDBStub.getCall(0).args).toStrictEqual([1, 1]);
    });
  });

  describe("createTask", () => {
    let taskModelCreateTaskInDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelCreateTaskInDBStub = sinon.stub(taskModel, "createTaskInDB");
    });

    afterEach(() => {
      taskModelCreateTaskInDBStub.restore();
    });

    it("Should create a new task for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Test Task",
        status: STATUS.TODO,
        userId: 1,
      };

      const userId = 1;

      const taskWithUserId = { ...task, userId };

      createTask(task, userId);

      expect(taskModelCreateTaskInDBStub.callCount).toBe(1);
      expect(taskModelCreateTaskInDBStub.getCall(0).args).toStrictEqual([taskWithUserId]);
    });
  });

  describe("updateTaskById", () => {
    let taskModelUpdateTaskInDBStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelUpdateTaskInDBStub = sinon.stub(taskModel, "updateTaskInDB");
    });

    afterEach(() => {
      taskModelUpdateTaskInDBStub.restore();
    });

    it("Should update task by id for the user", () => {
      const task: ITask = {
        id: 1,
        name: "Updated Task",
        status: STATUS.COMPLETE,
        userId: 1,
      };

      const userId = 1;
      const taskId = 1;

      updateTaskById(taskId, task, userId);

      expect(taskModelUpdateTaskInDBStub.callCount).toBe(1);
      expect(taskModelUpdateTaskInDBStub.getCall(0).args).toStrictEqual([taskId, task, userId]);
    });
  });
});