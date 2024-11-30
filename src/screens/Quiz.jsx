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
  } = useContext(Context);
  // console.log(mcqsData, "HELLO BHAI ");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = demoQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

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
    <View style={styles.container}>
      <Text style={styles.header}>Reading Comprehension Activity</Text>

      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.questionContainer}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{mcqsData?.question}</Text>
          </View>

          <View style={styles.optionContainer}>
            {mcqsData?.options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === index + 1
                    ? styles.selectedOption
                    : styles.defaultOption,
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

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selectedOption ? "#00bcd4" : "#999" },
        ]}
        onPress={validateQuizAnswer}
        disabled={selectedOption <= 0}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {answeredLastQuestionCorrectly && (
        <TouchableOpacity
          style={styles.restartButton}
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
    backgroundColor: "#9fc1ca",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  scrollableContainer: {
    backgroundColor: "#bdd8dd",
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
    backgroundColor: "#b0e0e6",
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
  selectedOption: {
    backgroundColor: "#2196f3",
    borderColor: "#2196f3",
  },
  defaultOption: {
    backgroundColor: "#f0f0f0",
    borderColor: "#dcdcdc",
  },
  button: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bcd4",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  restartButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#00bcd4",
    borderRadius: 8,
  },
  restartText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Quiz;
