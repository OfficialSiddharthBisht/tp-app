import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { demoQuestions } from "../utils/Quiz/Questions";
import AnswerModal from "../components/AnswerModal";
import Context from "../contexts/context";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isCorrect, setIsCorrect] = useState(false);
  const [answeredLastQuestionCorrectly, setAnsweredLastQuestionCorrectly] =
    useState(false);

  const {
    mcqsData,
    selectedOption,
    setSelectedOption,
    validateQuizAnswer,
    isAnswerModalVisible,
    setIsAnswerModalVisible,
    isCorrect,
    setIsCorrect,
    setShowHintButton,
    setShowHintButtonNotification,
    handleMoveToNextMcq,
    theme,
  } = useContext(Context);
  // console.log(mcqsData, "HELLO BHAI ");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = demoQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer + 1;

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
      if (currentQuestionIndex === demoQuestions.length - 1) {
        setAnsweredLastQuestionCorrectly(true);
      }
    } else {
      setIsCorrect(false);
    }

    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);

    if (currentQuestionIndex < demoQuestions.length - 1) {
      if (isCorrect) {
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnsweredLastQuestionCorrectly(false);
    }
  };

  const currentQuestion = demoQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === demoQuestions.length - 1;

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.backgroundColor }]}
    >
      <Text style={[styles.header, { color: theme?.textColor }]}>
        Reading Comprehension Activity
      </Text>

      <ScrollView
        style={[
          styles.scrollableContainer,
          { backgroundColor: theme?.quizContainer },
        ]}
      >
        <View style={styles.questionContainer}>
          <View
            style={[
              styles.questionBox,
              { backgroundColor: theme?.questionBox },
            ]}
          >
            <Text style={styles.questionText}>{mcqsData?.question}</Text>
          </View>

          <View style={styles.optionContainer}>
            {mcqsData?.options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === index + 1
                    ? theme?.selectedOption
                    : theme?.defaultOption,
                ]}
                onPress={() => {
                  const option = index + 1;
                  handleOptionClick(option);
                }}
              >
                <Text>{item?.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: selectedOption
                ? theme?.selectedOptionButton
                : theme?.unSelectedOptionButton,
            },
          ]}
          onPress={validateQuizAnswer}
          disabled={selectedOption <= 0}
        >
          <Text style={[styles.buttonText, { color: theme?.buttonText }]}>
            Next
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.skipButton,
            { backgroundColor: theme?.skipButton },
          ]}
          onPress={() => {
            handleMoveToNextMcq();
          }}
        >
          <Text style={[styles.buttonText, { color: theme?.buttonText }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {answeredLastQuestionCorrectly && (
        <TouchableOpacity
          style={[
            styles.restartButton,
            { backgroundColor: theme?.selectedOptionButton },
          ]}
          onPress={handleCloseModal}
        >
          <Text style={styles.restartText}>
            All questions are done, click here to restart
          </Text>
        </TouchableOpacity>
      )}

      <AnswerModal
        isVisible={isAnswerModalVisible}
        isCorrect={isCorrect}
        onClose={() => {
          setIsAnswerModalVisible(false);
          if (!isCorrect) {
            setShowHintButton(true);
            setShowHintButtonNotification(true);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  scrollableContainer: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  optionContainer: {
    marginBottom: 16,
  },
  option: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  selectedOption: {},

  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restartButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  restartText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 16,
    gap: 8,
  },
  skipButton: {
    flex: 1 / 4,
  },
});

export default Quiz;
