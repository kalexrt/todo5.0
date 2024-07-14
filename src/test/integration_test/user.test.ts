import request from "supertest";
import express from "express";
import router from "../../routes/index.routes";
import { users } from "../../model/user.model";

describe("User Integration Test Suite", () => {
  const app = express();

  app.use(express.json());

  app.use(router);

  describe("createUser API test", () => {
    it("Should create a new user", async ()=>{
        const response = await request(app)
        .post("/users")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiS2FsYXNoIiwiZW1haWwiOiJrYWxhc2gxQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zIjpbInVzZXJzLmdldEFsbCIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmdldEJ5SWQiLCJ1c2Vycy51cGRhdGVCeUlkIiwidXNlcnMuZGVsZXRlQnlJZCJdLCJpYXQiOjE3MjA3NjkxNzksImV4cCI6MTcyMTM3Mzk3OX0.L19B91d_E1x_jbMXOvvecUNMhy-yn6zNoLCNgxZ951Y")
        .send({
            id: "4",
            name: "User integration Test",
            email: "user1@test.com",
            password: "Test1234!",
            permissions:[],
        });
        console.log(users)
    })
  });
});
