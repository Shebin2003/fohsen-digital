-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: digital_health
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation` (
  `consultation_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `consultation_by` int DEFAULT NULL,
  `notes` varchar(50) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`consultation_id`),
  KEY `Patient_Id` (`patient_id`),
  KEY `Consultation_by` (`consultation_by`),
  CONSTRAINT `consultation_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `consultation_ibfk_2` FOREIGN KEY (`consultation_by`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation`
--

LOCK TABLES `consultation` WRITE;
/*!40000 ALTER TABLE `consultation` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  CONSTRAINT `patient_chk_1` CHECK (((`gender` = _utf8mb4'm') or (`gender` = _utf8mb4'f')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_diagnosis`
--

DROP TABLE IF EXISTS `patient_diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_diagnosis` (
  `diagnosis_id` int DEFAULT NULL,
  `consultation_id` int DEFAULT NULL,
  `type` enum('woman','child') DEFAULT NULL,
  `medicine` varchar(50) DEFAULT NULL,
  KEY `consultation_id` (`consultation_id`),
  CONSTRAINT `patient_diagnosis_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultation` (`consultation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_diagnosis`
--

LOCK TABLES `patient_diagnosis` WRITE;
/*!40000 ALTER TABLE `patient_diagnosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_symptoms`
--

DROP TABLE IF EXISTS `patient_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_symptoms` (
  `ps_id` int NOT NULL,
  `consultation_id` int DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `symptoms` int DEFAULT NULL,
  PRIMARY KEY (`ps_id`),
  KEY `Consultation_Id` (`consultation_id`),
  KEY `symptoms` (`symptoms`),
  CONSTRAINT `patient_symptoms_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultation` (`consultation_id`),
  CONSTRAINT `patient_symptoms_ibfk_3` FOREIGN KEY (`symptoms`) REFERENCES `symptoms` (`symptom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_symptoms`
--

LOCK TABLES `patient_symptoms` WRITE;
/*!40000 ALTER TABLE `patient_symptoms` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_diagnosis`
--

DROP TABLE IF EXISTS `pre_diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_diagnosis` (
  `pd_id` int NOT NULL,
  `consultation_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `Bp` int DEFAULT NULL,
  `temperature` int DEFAULT NULL,
  `diagnosis_by` int DEFAULT NULL,
  PRIMARY KEY (`pd_id`),
  KEY `Patient_Id` (`patient_id`),
  KEY `Diagnosis_by` (`diagnosis_by`),
  KEY `Consultation_Id` (`consultation_id`),
  CONSTRAINT `pre_diagnosis_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `pre_diagnosis_ibfk_2` FOREIGN KEY (`diagnosis_by`) REFERENCES `staff` (`staff_id`),
  CONSTRAINT `pre_diagnosis_ibfk_3` FOREIGN KEY (`consultation_id`) REFERENCES `consultation` (`consultation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_diagnosis`
--

LOCK TABLES `pre_diagnosis` WRITE;
/*!40000 ALTER TABLE `pre_diagnosis` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL,
  `type` enum('nurse','doctor') DEFAULT NULL,
  `name` varchar(35) DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms`
--

DROP TABLE IF EXISTS `symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms` (
  `symptom_id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`symptom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms`
--

LOCK TABLES `symptoms` WRITE;
/*!40000 ALTER TABLE `symptoms` DISABLE KEYS */;
/*!40000 ALTER TABLE `symptoms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-14 11:07:57
