# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.28)
# Database: kristhb42_resto
# Generation Time: 2016-10-04 22:46:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL DEFAULT '',
  `price` double NOT NULL,
  `price_ext` double NOT NULL,
  `type` varchar(5) NOT NULL,
  `year` varchar(9) NOT NULL DEFAULT '',
  `week` int(11) NOT NULL,
  `day` varchar(3) NOT NULL,
  `veggie` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;

INSERT INTO `menu` (`id`, `name`, `name_en`, `price`, `price_ext`, `type`, `year`, `week`, `day`, `veggie`)
VALUES
	(1,'Tomatensoep','Tomato soup',1,0,'soup','16-17',38,'2',0),
	(2,'Wortel-gember met kokosmelk','',1,0,'soup','16-17',38,'2',0),
	(3,'Vol-au-vent','',4.8,0,'snack','16-17',38,'2',0),
	(4,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',38,'2',0),
	(5,'Stoofvlees','',4.8,0,'snack','16-17',38,'2',0),
	(6,'Tomatensoep','',1,0,'soup','16-17',38,'3',0),
	(7,'Brunoisesoep','',1,0,'soup','16-17',38,'3',0),
	(8,'Balletjes op Luikse wijze, puree en appelmoes','',4.2,0,'dish','16-17',38,'3',0),
	(9,'Vegetarische lasagne','',4.2,0,'dish','16-17',38,'3',1),
	(10,'Zalmfilet met Hollandse saus. brocolli en stampot','',4.2,0,'dish','16-17',38,'3',0),
	(11,'Vol-au-vent','',4.8,0,'snack','16-17',38,'3',0),
	(12,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',38,'3',0),
	(13,'Stoofvlees','',4.8,0,'snack','16-17',38,'3',0),
	(14,'Tomatensoep','',1,0,'soup','16-17',38,'4',0),
	(15,'Aspergeroomsoep','',1,0,'soup','16-17',38,'4',0),
	(16,'Veggiecubes met curry en ananas, Chinese groenten en rijst','',4.2,0,'dish','16-17',38,'4',1),
	(17,'Pasta met veggieballetjes in tomatensaus','',4.2,0,'dish','16-17',38,'4',1),
	(18,'Tongrolletje met sauseje van fijne groentjes en krielaardappelen','',4.2,0,'dish','16-17',38,'4',0),
	(19,'Vol-au-vent','',4.8,0,'snack','16-17',38,'4',0),
	(20,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',38,'4',0),
	(21,'Stoofvlees','',4.8,0,'snack','16-17',38,'4',0),
	(22,'Tomatensoep','',1,0,'soup','16-17',38,'5',0),
	(23,'Tomatensoep met balletjes','',1,0,'soup','16-17',38,'5',0),
	(24,'Vispannetje met groentepuree','',4.2,0,'dish','16-17',38,'5',0),
	(25,'Bulgurstoofpotje','',4.2,0,'dish','16-17',38,'5',1),
	(26,'Vispannetje','',4.2,0,'dish','16-17',38,'5',0),
	(27,'Vol-au-vent','',4.8,0,'snack','16-17',38,'5',0),
	(28,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',38,'5',0),
	(29,'Stoofvlees','',4.8,0,'snack','16-17',38,'5',0),
	(30,'Tomatensoep','Tomato soup',1,0,'soup','16-17',39,'1',0),
	(31,'Groentesoep','Vegetable soup',1,0,'soup','16-17',39,'1',0),
	(32,'Macaroni met ham en kaas','Macaroni with ham and cheese',4.2,0,'dish','16-17',39,'1',0),
	(33,'Nasi goreng met veggiesaus','',4.2,0,'dish','16-17',39,'1',1),
	(34,'Koolvis, vissaus met een brunoise van groentjes en puree','',4.2,0,'dish','16-17',39,'1',0),
	(35,'Vol-au-vent','',4.8,0,'snack','16-17',39,'1',0),
	(36,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',39,'1',0),
	(37,'Stoofvlees','',4.8,0,'snack','16-17',39,'1',0),
	(38,'Tomatensoep','',1,0,'soup','16-17',39,'2',0),
	(39,'Koninginnesoep','',1,0,'soup','16-17',39,'2',0),
	(40,'Hongaarse goulash met natuuraardappelen','',4.2,0,'dish','16-17',39,'2',0),
	(41,'Groenteburger en wortelstampot met italiaanse tomatensaus','',4.2,0,'dish','16-17',39,'2',1),
	(42,'Zalmlasagne','',4.2,0,'dish','16-17',39,'2',0),
	(43,'Vol-au-vent','',4.8,0,'snack','16-17',39,'2',0),
	(44,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',39,'2',0),
	(45,'Stoofvlees','',4.8,0,'snack','16-17',39,'2',0),
	(46,'Tomatensoep','',1,0,'soup','16-17',39,'3',0),
	(47,'Tomatencrème','',1,0,'soup','16-17',39,'3',0),
	(48,'Blinde vink, erwten en wortelen, aardappelgratin','',4.2,0,'dish','16-17',39,'3',0),
	(49,'Quinoaburger, rijst met fijne groentjes en currysaus','',4.2,0,'dish','16-17',39,'3',1),
	(50,'Gepaneerde kabeljouw met sla, tartaar en frieten','',4.2,0,'dish','16-17',39,'3',0),
	(51,'Vol-au-vent','',4.8,0,'snack','16-17',39,'3',0),
	(52,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',39,'3',0),
	(53,'Stoofvlees','',4.8,0,'snack','16-17',39,'3',0),
	(54,'Tomatensoep','',1,0,'soup','16-17',39,'4',0),
	(55,'Kervelsoep','',1,0,'soup','16-17',39,'4',0),
	(56,'Vegetarische bamigoreng (currysaus met Jonagold)','',4.2,0,'dish','16-17',39,'4',1),
	(57,'Tortelloni','',4.2,0,'dish','16-17',39,'4',1),
	(58,'Zalmfilet met Hollandse saus, brocolli en krieltjes','',4.2,0,'dish','16-17',39,'4',0),
	(59,'Vol-au-ven','',4.8,0,'snack','16-17',39,'4',0),
	(60,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',39,'4',0),
	(61,'Stoofvlees','',4.8,0,'snack','16-17',39,'4',0),
	(62,'Tomatensoep','',1,0,'soup','16-17',39,'5',0),
	(63,'Courgettesoep','',1,0,'soup','16-17',39,'5',0),
	(64,'Vispannetje op Oostendse wijze, stampot','',4.2,0,'dish','16-17',39,'5',0),
	(65,'Broccoli-aardappelgerecht','',4.2,0,'dish','16-17',39,'5',1),
	(66,'Zalm in Normandische saus met pasta, spek en pesto','',4.2,0,'dish','16-17',39,'5',0),
	(67,'Vol-au-vent','',4.8,0,'snack','16-17',39,'5',0),
	(68,'Bouletten in tomatensaus','',4.8,0,'snack','16-17',39,'5',0),
	(69,'Stoofvlees','',4.8,0,'snack','16-17',39,'5',0);

/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
