import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import validator from "validator";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    // validate email
    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email address",
      });
    }

    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: "Password is not minimum 8 characters, please change.",
      });
    }

    // sends to database for reference
    await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt,
      },
    });

    return { data: "success" };
  } catch (error) {
    console.log(error.code);

    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "Email address already exist!",
      });
    }
    throw error;
  }
});
