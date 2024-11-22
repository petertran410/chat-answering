import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestion } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sqlalchemy" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "https://example.com/johndoe.jpg",
    },
    upvotes: 50000,
    views: 1000,
    answers: [
      {
        _id: "1",
        content: "Ensure cascading deletes are configured in relationships.",
      },
      { _id: "2", content: "Use `delete-orphan` for dependent objects." },
    ],
    createdAt: new Date("2024-11-19T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to optimize React app performance?",
    tags: [
      { _id: "3", name: "react" },
      { _id: "4", name: "performance" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "https://example.com/janesmith.jpg",
    },
    upvotes: 25,
    views: 300,
    answers: [
      {
        _id: "3",
        content: "Use memoization techniques like `React.memo` and `useMemo`.",
      },
      {
        _id: "4",
        content: "Avoid passing unnecessary props to child components.",
      },
    ],
    createdAt: new Date("2021-10-04T10:30:00.000Z"),
  },
];

async function Home() {
  const result = await getQuestion({});

  console.log(result.questions);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a questions
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex flex-col w-full gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}

export default Home;
