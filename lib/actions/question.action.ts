"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = async (param: any) => {
  // eslint-disable-next-line np-empty
  try {
    connectToDatabase();
  } catch (error) {}
};
