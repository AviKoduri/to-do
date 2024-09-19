import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// declare type RedisClientType = import("ioredis").RedisClientType;
import nodemailer from "nodemailer";
import { RedisClient } from "./services/redis";


export default {
  Query: {
    hello: (root: any, { name }: { name: string }, ctx: any) => {
      return `Hello ${name || "World"}`;
    },
  },
  Mutation: {
    login: async (
      root: any,
      { userName, password }: { userName: string; password: string, role: string },
      ctx: any
    ) => {
      
    },

  },
};

