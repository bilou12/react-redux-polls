import { _saveQuestion, _saveQuestionAnswer, formatQuestion } from "./api.js";

describe("_saveQuestion", () => {
  it("will return the saved question with all expected fields when correctly formatted data is passed to the function", async () => {
    var question = {
      optionOneText: "option1",
      optionTwoText: "option2",
      author: "authedUser",
    };
    var result = await _saveQuestion(question);
    expect(result.formattedQuestion.author).toEqual(question.author);
    expect(result.formattedQuestion.optionOne.text).toEqual(
      question.optionOneText
    );
    expect(result.formattedQuestion.optionTwo.text).toEqual(
      question.optionTwoText
    );
  });

  it("will return an error if incorrect data is passed to the function", async () => {
    var invalidData = "NA";
    await expect(_saveQuestion(invalidData)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return true when correctly formatted data is passed to the function", async () => {
    var questionAnswer = {
      authedUser: "mtsamis",
      qid: "am8ehyc8byjqgar0jgpub9",
      answer: "optionOne",
    };
    var { users, questions } = await _saveQuestionAnswer(questionAnswer);

    let expectedUsers = {
      mtsamis: {
        answers: {
          "6ni6ok3ym7mf1p33lnez": "optionOne",
          vthrdm985a262al8qx3do: "optionTwo",
          xj352vofupe1dqz9emx13r: "optionOne",
          am8ehyc8byjqgar0jgpub9: "optionOne",
        },
        avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
        id: "mtsamis",
        name: "Mike Tsamis",
        password: "xyz123",
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
      },
    };

    let expectedQuestions = {
      am8ehyc8byjqgar0jgpub9: {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "sarahedo",
        timestamp: 1488579767190,
        optionOne: {
          votes: ["mtsamis"],
          text: "conduct a release retrospective 1 week after a release",
        },
        optionTwo: {
          votes: ["sarahedo"],
          text: "conduct release retrospectives quarterly",
        },
      },
    };

    expect(users[questionAnswer.authedUser]).toEqual(
      expectedUsers[questionAnswer.authedUser]
    );
    expect(questions[questionAnswer.qid]).toEqual(
      expectedQuestions[questionAnswer.qid]
    );
  });

  it("will return an error if incorrect data is passed to the function", async () => {
    var invalidData = "NA";
    await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

describe("formatQuestion", () => {
  it("will return formatted question when correctly formatted data is passed to the function", () => {
    let optionOneText = "optionOneText";
    let optionTwoText = "optionTwoText";
    let author = "author";

    var formattedQuestion = formatQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    expect(formattedQuestion.optionOne.text).toEqual(optionOneText);
    expect(formattedQuestion.optionTwo.text).toEqual(optionTwoText);
    expect(formattedQuestion.author).toEqual(author);
  });

  it("will return an error if incorrect data is passed to the function", () => {
    expect(() => formatQuestion({})).toThrow();
  });
});
