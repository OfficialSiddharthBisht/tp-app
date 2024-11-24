import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0c1ca",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pointsStreakContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 15,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  logo: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileEmail: {
    fontSize: 16,
    color: "#333",
  },
  streakContainer: {
    position: "absolute",
    top: -15,
    zIndex: -2,
    right: -15,
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#79d2eb",
    overflow: "visible",
  },
  streakText: {
    color: "#fff",
    fontWeight: "600",
  },
  pointsContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#79d2eb",
    borderRadius: 12,
    backgroundColor: "#f1f9fc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsLabel: {
    fontSize: 18,
    color: "#444",
    fontWeight: "600",
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#79d2eb",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statsBox: {
    alignItems: "center",
  },
  statsValue: {
    fontSize: 22,
    fontWeight: "600",
  },
  statsLabel: {
    fontSize: 14,
    color: "#333",
  },
  profileDetails: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  upgradeButton: {
    marginLeft: 10,
    backgroundColor: "#c7222a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 0.7,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  upgradeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  badgesSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#79d2eb",
    padding: 10,
    borderRadius: 12,
    margin: 5,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  closeIconContainer: {
    alignSelf: "flex-end",
    bottom: "90%",
    left: 15,
    borderWidth: 0.5,
    backgroundColor: "#1123",
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#c7222a",
    padding: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#79d2eb",
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  logoutContainer: {
    marginTop: 40,
    width: "100%",
  },
  logoutButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79d2eb",
    padding: 12,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  deleteAccountContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  deleteAccountButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c7222a",
    padding: 12,
    borderRadius: 12,
  },
  deleteAccountButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensure it's on top
    pointerEvents: "none", // Allow touches to pass through
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#79d2eb",
  },
});
