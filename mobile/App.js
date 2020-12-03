import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { BrowserRouter as Router } from "react-router-dom"
import MainRouter from "./MainRouter"

export default function App() {
  return (
    <Router>
      <MainRouter />
    </Router>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
