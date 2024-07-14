import request from "supertest";
import express from "express";
import router from "../../routes/index.routes";
import config from "../../config";
import expect from "expect";
import { genericErrorHandler, routeNotFoundError } from "../../middlewares/errorHandler.middleware";

describe("User Integration Test Suite", () => {
  const app = express();
  const token = config.testBearerToken;
  app.use(express.json());

  app.use(router);
  app.use(genericErrorHandler);
  app.use(routeNotFoundError);

  describe("createUser API test", () => {
    it("Should create a new user", async ()=>{
        const response = await request(app)
        .post("/users")
        .set("Authorization", token)
        .send({
            id: "4",
            name: "User integration Test",
            email: "user1@test.com",
            password: "Test1234!",
            permissions:[],
        });
        expect(response.body).toHaveProperty("message", "User created");
    })
  });
  describe("getUserById API test", () => {
    it("Should return user by id", async () => {
      const userId = "1";

      const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", token)

      expect(response.body).toHaveProperty("id", "1");
      expect(response.body).toHaveProperty("name", "Kalash");
      expect(response.body).toHaveProperty("email", "kalash1@gmail.com");
    });

    it("Should return error when user is not found", async () => {
      const userId = "999";

      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", token)

      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toHaveProperty("message", "Not Found");
    });
  });
});
