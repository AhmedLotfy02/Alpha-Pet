-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: alpha_pet
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `OwnerEmail` varchar(50) NOT NULL,
  `VetEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`StartDate`,`OwnerEmail`),
  KEY `VetEmail` (`VetEmail`),
  KEY `OwnerEmail` (`OwnerEmail`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`VetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`OwnerEmail`) REFERENCES `owner_table` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinic`
--

DROP TABLE IF EXISTS `clinic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic` (
  `VetEmail` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Phone` int NOT NULL,
  `StartDay` varchar(100) DEFAULT NULL,
  `EndDay` varchar(100) DEFAULT NULL,
  `StartHour` varchar(100) DEFAULT NULL,
  `EndHour` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`VetEmail`),
  CONSTRAINT `clinic_ibfk_1` FOREIGN KEY (`VetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic`
--

LOCK TABLES `clinic` WRITE;
/*!40000 ALTER TABLE `clinic` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree` (
  `DegreeYear` int NOT NULL,
  `College` varchar(50) NOT NULL,
  `DegreeName` varchar(500) NOT NULL,
  `VetEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`DegreeYear`,`College`,`DegreeName`,`VetEmail`),
  KEY `VetEmail` (`VetEmail`),
  CONSTRAINT `degree_ibfk_1` FOREIGN KEY (`VetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree`
--

LOCK TABLES `degree` WRITE;
/*!40000 ALTER TABLE `degree` DISABLE KEYS */;
/*!40000 ALTER TABLE `degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_table`
--

DROP TABLE IF EXISTS `history_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_table` (
  `vetEmail` varchar(50) NOT NULL,
  `Appointment_Date` timestamp NOT NULL,
  PRIMARY KEY (`vetEmail`,`Appointment_Date`),
  CONSTRAINT `history_table_ibfk_1` FOREIGN KEY (`vetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_table`
--

LOCK TABLES `history_table` WRITE;
/*!40000 ALTER TABLE `history_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `InvoiceId` int NOT NULL,
  `Notes` varchar(500) DEFAULT NULL,
  `RequiredMedicines` varchar(100) DEFAULT NULL,
  `PharmacyID` int NOT NULL,
  `VetEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`InvoiceId`),
  KEY `VetEmail` (`VetEmail`),
  KEY `PharmacyID` (`PharmacyID`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`VetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`PharmacyID`) REFERENCES `pharmacy` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medcine_pharmacy`
--

DROP TABLE IF EXISTS `medcine_pharmacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medcine_pharmacy` (
  `PharmacyId` int NOT NULL,
  `MedicineId` int NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`PharmacyId`,`MedicineId`),
  KEY `MedicineId` (`MedicineId`),
  CONSTRAINT `medcine_pharmacy_ibfk_1` FOREIGN KEY (`MedicineId`) REFERENCES `medicines` (`MedicineId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medcine_pharmacy_ibfk_2` FOREIGN KEY (`PharmacyId`) REFERENCES `pharmacy` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medcine_pharmacy`
--

LOCK TABLES `medcine_pharmacy` WRITE;
/*!40000 ALTER TABLE `medcine_pharmacy` DISABLE KEYS */;
/*!40000 ALTER TABLE `medcine_pharmacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `MedicineId` int NOT NULL,
  `MedName` varchar(100) NOT NULL,
  `MedDescription` varchar(200) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`MedicineId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_comment`
--

DROP TABLE IF EXISTS `owner_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_comment` (
  `C_Id` int NOT NULL AUTO_INCREMENT,
  `Comment_Content` varchar(10000) NOT NULL,
  `OwnerEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`C_Id`),
  KEY `OwnerEmail` (`OwnerEmail`),
  CONSTRAINT `owner_comment_ibfk_1` FOREIGN KEY (`OwnerEmail`) REFERENCES `owner_table` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_comment`
--

LOCK TABLES `owner_comment` WRITE;
/*!40000 ALTER TABLE `owner_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `owner_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_post`
--

DROP TABLE IF EXISTS `owner_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_post` (
  `P_Id` int NOT NULL AUTO_INCREMENT,
  `Post_Content` varchar(10000) NOT NULL,
  `OwnerEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`P_Id`),
  KEY `OwnerEmail` (`OwnerEmail`),
  CONSTRAINT `owner_post_ibfk_1` FOREIGN KEY (`OwnerEmail`) REFERENCES `owner_table` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_post`
--

LOCK TABLES `owner_post` WRITE;
/*!40000 ALTER TABLE `owner_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `owner_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_table`
--

DROP TABLE IF EXISTS `owner_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_table` (
  `Email` varchar(50) NOT NULL,
  `FName` varchar(50) NOT NULL,
  `LName` varchar(50) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `Balance` float DEFAULT NULL,
  `Favourite_Vet_Email` varchar(50) DEFAULT NULL,
  `City` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`Email`),
  KEY `Favourite_Vet_Email` (`Favourite_Vet_Email`),
  CONSTRAINT `owner_table_ibfk_1` FOREIGN KEY (`Favourite_Vet_Email`) REFERENCES `vet` (`Email`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_table`
--

LOCK TABLES `owner_table` WRITE;
/*!40000 ALTER TABLE `owner_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `owner_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownerpost_ownercomment`
--

DROP TABLE IF EXISTS `ownerpost_ownercomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownerpost_ownercomment` (
  `OwnerPost_ID` int NOT NULL,
  `OwnerComment_ID` int NOT NULL,
  PRIMARY KEY (`OwnerPost_ID`,`OwnerComment_ID`),
  KEY `OwnerComment_ID` (`OwnerComment_ID`),
  CONSTRAINT `ownerpost_ownercomment_ibfk_1` FOREIGN KEY (`OwnerPost_ID`) REFERENCES `owner_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerpost_ownercomment_ibfk_2` FOREIGN KEY (`OwnerComment_ID`) REFERENCES `owner_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerpost_ownercomment`
--

LOCK TABLES `ownerpost_ownercomment` WRITE;
/*!40000 ALTER TABLE `ownerpost_ownercomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ownerpost_ownercomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownerpost_pharmacistcomment`
--

DROP TABLE IF EXISTS `ownerpost_pharmacistcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownerpost_pharmacistcomment` (
  `OwnerPost_ID` int NOT NULL,
  `PharmacistComment_ID` int NOT NULL,
  PRIMARY KEY (`OwnerPost_ID`,`PharmacistComment_ID`),
  KEY `PharmacistComment_ID` (`PharmacistComment_ID`),
  CONSTRAINT `ownerpost_pharmacistcomment_ibfk_1` FOREIGN KEY (`OwnerPost_ID`) REFERENCES `owner_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerpost_pharmacistcomment_ibfk_2` FOREIGN KEY (`PharmacistComment_ID`) REFERENCES `pharmacist_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerpost_pharmacistcomment`
--

LOCK TABLES `ownerpost_pharmacistcomment` WRITE;
/*!40000 ALTER TABLE `ownerpost_pharmacistcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ownerpost_pharmacistcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownerpost_vetcomment`
--

DROP TABLE IF EXISTS `ownerpost_vetcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownerpost_vetcomment` (
  `OwnerPost_ID` int NOT NULL,
  `VetComment_ID` int NOT NULL,
  PRIMARY KEY (`OwnerPost_ID`,`VetComment_ID`),
  KEY `VetComment_ID` (`VetComment_ID`),
  CONSTRAINT `ownerpost_vetcomment_ibfk_1` FOREIGN KEY (`OwnerPost_ID`) REFERENCES `owner_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerpost_vetcomment_ibfk_2` FOREIGN KEY (`VetComment_ID`) REFERENCES `vet_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownerpost_vetcomment`
--

LOCK TABLES `ownerpost_vetcomment` WRITE;
/*!40000 ALTER TABLE `ownerpost_vetcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ownerpost_vetcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `ownerEmail` varchar(50) NOT NULL,
  `petName` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`ownerEmail`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`ownerEmail`) REFERENCES `owner_table` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacist`
--

DROP TABLE IF EXISTS `pharmacist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacist` (
  `Email` varchar(50) NOT NULL,
  `FName` varchar(50) DEFAULT NULL,
  `LName` varchar(50) DEFAULT NULL,
  `Pharmacy_Id` int DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`Email`),
  KEY `Pharmacy_Id` (`Pharmacy_Id`),
  CONSTRAINT `pharmacist_ibfk_1` FOREIGN KEY (`Pharmacy_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacist`
--

LOCK TABLES `pharmacist` WRITE;
/*!40000 ALTER TABLE `pharmacist` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacist_comment`
--

DROP TABLE IF EXISTS `pharmacist_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacist_comment` (
  `C_Id` int NOT NULL AUTO_INCREMENT,
  `Comment_Content` varchar(10000) NOT NULL,
  `PharmacistEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`C_Id`),
  KEY `PharmacistEmail` (`PharmacistEmail`),
  CONSTRAINT `pharmacist_comment_ibfk_1` FOREIGN KEY (`PharmacistEmail`) REFERENCES `pharmacist` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacist_comment`
--

LOCK TABLES `pharmacist_comment` WRITE;
/*!40000 ALTER TABLE `pharmacist_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacist_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacist_post`
--

DROP TABLE IF EXISTS `pharmacist_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacist_post` (
  `P_Id` int NOT NULL AUTO_INCREMENT,
  `Post_Content` varchar(10000) NOT NULL,
  `PharmacistEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`P_Id`),
  KEY `PharmacistEmail` (`PharmacistEmail`),
  CONSTRAINT `pharmacist_post_ibfk_1` FOREIGN KEY (`PharmacistEmail`) REFERENCES `pharmacist` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacist_post`
--

LOCK TABLES `pharmacist_post` WRITE;
/*!40000 ALTER TABLE `pharmacist_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacist_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacistpost_ownercomment`
--

DROP TABLE IF EXISTS `pharmacistpost_ownercomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacistpost_ownercomment` (
  `PharmacistPost_ID` int NOT NULL,
  `OwnerComment_ID` int NOT NULL,
  PRIMARY KEY (`PharmacistPost_ID`,`OwnerComment_ID`),
  KEY `OwnerComment_ID` (`OwnerComment_ID`),
  CONSTRAINT `pharmacistpost_ownercomment_ibfk_1` FOREIGN KEY (`PharmacistPost_ID`) REFERENCES `pharmacist_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pharmacistpost_ownercomment_ibfk_2` FOREIGN KEY (`OwnerComment_ID`) REFERENCES `owner_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacistpost_ownercomment`
--

LOCK TABLES `pharmacistpost_ownercomment` WRITE;
/*!40000 ALTER TABLE `pharmacistpost_ownercomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacistpost_ownercomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacistpost_pharmacistcomment`
--

DROP TABLE IF EXISTS `pharmacistpost_pharmacistcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacistpost_pharmacistcomment` (
  `PharmacistPost_ID` int NOT NULL,
  `PharmacistComment_ID` int NOT NULL,
  PRIMARY KEY (`PharmacistPost_ID`,`PharmacistComment_ID`),
  KEY `PharmacistComment_ID` (`PharmacistComment_ID`),
  CONSTRAINT `pharmacistpost_pharmacistcomment_ibfk_1` FOREIGN KEY (`PharmacistPost_ID`) REFERENCES `pharmacist_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pharmacistpost_pharmacistcomment_ibfk_2` FOREIGN KEY (`PharmacistComment_ID`) REFERENCES `pharmacist_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacistpost_pharmacistcomment`
--

LOCK TABLES `pharmacistpost_pharmacistcomment` WRITE;
/*!40000 ALTER TABLE `pharmacistpost_pharmacistcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacistpost_pharmacistcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacistpost_vetcomment`
--

DROP TABLE IF EXISTS `pharmacistpost_vetcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacistpost_vetcomment` (
  `PharmacistPost_ID` int NOT NULL,
  `VetComment_ID` int NOT NULL,
  PRIMARY KEY (`PharmacistPost_ID`,`VetComment_ID`),
  KEY `VetComment_ID` (`VetComment_ID`),
  CONSTRAINT `pharmacistpost_vetcomment_ibfk_1` FOREIGN KEY (`PharmacistPost_ID`) REFERENCES `pharmacist_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pharmacistpost_vetcomment_ibfk_2` FOREIGN KEY (`VetComment_ID`) REFERENCES `vet_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacistpost_vetcomment`
--

LOCK TABLES `pharmacistpost_vetcomment` WRITE;
/*!40000 ALTER TABLE `pharmacistpost_vetcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacistpost_vetcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacy`
--

DROP TABLE IF EXISTS `pharmacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacy` (
  `Id` int NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Phone` int NOT NULL,
  `StartDay` varchar(100) DEFAULT NULL,
  `EndDay` varchar(100) DEFAULT NULL,
  `StartHour` varchar(100) DEFAULT NULL,
  `EndHour` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacy`
--

LOCK TABLES `pharmacy` WRITE;
/*!40000 ALTER TABLE `pharmacy` DISABLE KEYS */;
/*!40000 ALTER TABLE `pharmacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `OwnerEmail` varchar(50) NOT NULL,
  `VetEmail` varchar(50) NOT NULL,
  `Rating` int NOT NULL,
  PRIMARY KEY (`OwnerEmail`,`VetEmail`),
  KEY `VetEmail` (`VetEmail`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`VetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`OwnerEmail`) REFERENCES `owner_table` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet`
--

DROP TABLE IF EXISTS `vet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet` (
  `Email` varchar(50) NOT NULL,
  `FName` varchar(50) NOT NULL,
  `LName` varchar(50) NOT NULL,
  `Charge` float DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet`
--

LOCK TABLES `vet` WRITE;
/*!40000 ALTER TABLE `vet` DISABLE KEYS */;
/*!40000 ALTER TABLE `vet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_comment`
--

DROP TABLE IF EXISTS `vet_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_comment` (
  `C_Id` int NOT NULL AUTO_INCREMENT,
  `Comment_Content` varchar(10000) NOT NULL,
  `vetEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`C_Id`),
  KEY `vetEmail` (`vetEmail`),
  CONSTRAINT `vet_comment_ibfk_1` FOREIGN KEY (`vetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_comment`
--

LOCK TABLES `vet_comment` WRITE;
/*!40000 ALTER TABLE `vet_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `vet_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_post`
--

DROP TABLE IF EXISTS `vet_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_post` (
  `P_Id` int NOT NULL AUTO_INCREMENT,
  `Post_Content` varchar(10000) NOT NULL,
  `vetEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`P_Id`),
  KEY `vetEmail` (`vetEmail`),
  CONSTRAINT `vet_post_ibfk_1` FOREIGN KEY (`vetEmail`) REFERENCES `vet` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_post`
--

LOCK TABLES `vet_post` WRITE;
/*!40000 ALTER TABLE `vet_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `vet_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vetpost_ownercomment`
--

DROP TABLE IF EXISTS `vetpost_ownercomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vetpost_ownercomment` (
  `VetPost_ID` int NOT NULL,
  `OwnerComment_ID` int NOT NULL,
  PRIMARY KEY (`VetPost_ID`,`OwnerComment_ID`),
  KEY `OwnerComment_ID` (`OwnerComment_ID`),
  CONSTRAINT `vetpost_ownercomment_ibfk_1` FOREIGN KEY (`VetPost_ID`) REFERENCES `vet_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vetpost_ownercomment_ibfk_2` FOREIGN KEY (`OwnerComment_ID`) REFERENCES `owner_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vetpost_ownercomment`
--

LOCK TABLES `vetpost_ownercomment` WRITE;
/*!40000 ALTER TABLE `vetpost_ownercomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `vetpost_ownercomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vetpost_pharmacistcomment`
--

DROP TABLE IF EXISTS `vetpost_pharmacistcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vetpost_pharmacistcomment` (
  `VetPost_ID` int NOT NULL,
  `PharmacistComment_ID` int NOT NULL,
  PRIMARY KEY (`VetPost_ID`,`PharmacistComment_ID`),
  KEY `PharmacistComment_ID` (`PharmacistComment_ID`),
  CONSTRAINT `vetpost_pharmacistcomment_ibfk_1` FOREIGN KEY (`VetPost_ID`) REFERENCES `vet_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vetpost_pharmacistcomment_ibfk_2` FOREIGN KEY (`PharmacistComment_ID`) REFERENCES `pharmacist_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vetpost_pharmacistcomment`
--

LOCK TABLES `vetpost_pharmacistcomment` WRITE;
/*!40000 ALTER TABLE `vetpost_pharmacistcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `vetpost_pharmacistcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vetpost_vetcomment`
--

DROP TABLE IF EXISTS `vetpost_vetcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vetpost_vetcomment` (
  `VetPost_ID` int NOT NULL,
  `VetComment_ID` int NOT NULL,
  PRIMARY KEY (`VetPost_ID`,`VetComment_ID`),
  KEY `VetComment_ID` (`VetComment_ID`),
  CONSTRAINT `vetpost_vetcomment_ibfk_1` FOREIGN KEY (`VetPost_ID`) REFERENCES `vet_post` (`P_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vetpost_vetcomment_ibfk_2` FOREIGN KEY (`VetComment_ID`) REFERENCES `vet_comment` (`C_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vetpost_vetcomment`
--

LOCK TABLES `vetpost_vetcomment` WRITE;
/*!40000 ALTER TABLE `vetpost_vetcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `vetpost_vetcomment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-24 21:09:12
