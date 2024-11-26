"use server";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import { revalidatePath } from "next/cache";

// export const getQuestions = async (params: GetQuestionsParams) => {
//   try {
//     await connectToDatabase();
//     const questions = await Question.find({})
//       .populate({ path: "tags", model: Tag, select: "name" })
//       .populate({ path: "author", model: User, select: "name" })
//       .sort({ createdAt: -1 })
//       .lean(); // Convert Mongoose documents to plain JavaScript objects

//     // Serialize Date objects and remove any potential circular references
//     const serializedQuestions = questions.map((question) => ({
//       ...question,
//       createdAt: question.createdAt.toISOString(), // Convert Date to string
//       // Ensure any nested objects do not contain circular references
//     }));

//     return { questions: serializedQuestions };
//   } catch (error) {
//     console.log("Error ...", error);
//     throw error;
//   }
// };

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log("Error ...", error);
    throw new Error("Question not found");
  }
};

export const createQuestion = async (param: CreateQuestionParams) => {
  // eslint-disable-next-line np-empty
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = param;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    // Create an interaction record for the user's ask_question action
    revalidatePath(path);
    // Imcrement author's reputation by +5 for creating a question
  } catch (error) {
    console.log(error);
    throw new Error("Can't create question");
  }
};
