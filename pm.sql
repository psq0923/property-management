/*
Navicat MySQL Data Transfer

Source Server         : psq
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : pm

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2017-01-14 14:07:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `adminaccess`
-- ----------------------------
DROP TABLE IF EXISTS `adminaccess`;
CREATE TABLE `adminaccess` (
  `access_id` int(11) NOT NULL AUTO_INCREMENT,
  `access_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminaccess
-- ----------------------------
INSERT INTO `adminaccess` VALUES ('1', '超级管理员');
INSERT INTO `adminaccess` VALUES ('2', '经理');
INSERT INTO `adminaccess` VALUES ('3', '保洁');
INSERT INTO `adminaccess` VALUES ('4', '水电工');
INSERT INTO `adminaccess` VALUES ('5', '保安');
INSERT INTO `adminaccess` VALUES ('7', '管理薪资');
INSERT INTO `adminaccess` VALUES ('8', '管理员工');
INSERT INTO `adminaccess` VALUES ('9', '财务管理');
INSERT INTO `adminaccess` VALUES ('10', '霸气管理员');

-- ----------------------------
-- Table structure for `adminuser`
-- ----------------------------
DROP TABLE IF EXISTS `adminuser`;
CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminuser
-- ----------------------------
INSERT INTO `adminuser` VALUES ('1', '1', '121233@163.com', 'admin', '0', 'admin');
INSERT INTO `adminuser` VALUES ('3', '3', '123@163.com', '123123', '1', '彭帅钦');
INSERT INTO `adminuser` VALUES ('10', '2', '123@163.com', '123123', '0', 'psq');
INSERT INTO `adminuser` VALUES ('11', '2', '123@163.com', '123123', '0', '佛挡杀佛');

-- ----------------------------
-- Table structure for `building`
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  `building_name` varchar(30) NOT NULL,
  `room_num` varchar(30) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of building
-- ----------------------------
INSERT INTO `building` VALUES ('3', '草莓园', '1', '0');
INSERT INTO `building` VALUES ('5', '幸福花园', '5', '0');

-- ----------------------------
-- Table structure for `complain`
-- ----------------------------
DROP TABLE IF EXISTS `complain`;
CREATE TABLE `complain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `back_info` varchar(255) DEFAULT NULL,
  `comp_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of complain
-- ----------------------------
INSERT INTO `complain` VALUES ('2', '1', null, '2017-01-13 10:45:37', '服务态度差', '9');
INSERT INTO `complain` VALUES ('3', '1', null, '2017-01-14 08:43:00', '你太帅啦', '9');
INSERT INTO `complain` VALUES ('4', '1', null, '2017-01-14 08:50:05', 'nihenshaui', '9');
INSERT INTO `complain` VALUES ('5', '1', null, '2017-01-14 08:55:22', '你怎么这么帅啊，嫉妒死你了，哼', '9');
INSERT INTO `complain` VALUES ('6', '1', null, '2017-01-14 08:58:56', '你发的就是改变发生的机会', '9');
INSERT INTO `complain` VALUES ('7', '1', null, '2017-01-14 09:01:17', '范德萨发生', '9');
INSERT INTO `complain` VALUES ('8', '7', null, '2017-01-14 09:07:39', '刚发的鬼地方个的分', '9');
INSERT INTO `complain` VALUES ('9', '1', null, '2017-01-14 10:13:00', '你个大坏蛋', '10');

-- ----------------------------
-- Table structure for `detail`
-- ----------------------------
DROP TABLE IF EXISTS `detail`;
CREATE TABLE `detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of detail
-- ----------------------------
INSERT INTO `detail` VALUES ('1', '4', '10', '9');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goods_id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) NOT NULL,
  `storage` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('4', '拖把', '40', '15');
INSERT INTO `goods` VALUES ('5', '楼栋门', '18', '200');
INSERT INTO `goods` VALUES ('6', '水管', '18', '5');

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `publish_time` date NOT NULL,
  `is_show` int(11) NOT NULL DEFAULT '0',
  `admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '快回家了啊dsad', '今天13号，15号就可以回家了fdsfsfdsfs&nbsp;', '2017-01-13', '0', '1');
INSERT INTO `news` VALUES ('3', 'gfdgdfg', 'fdsgfsgfg', '2017-01-13', '0', '1');
INSERT INTO `news` VALUES ('4', 'fdsfsdfsdf', 'dsafsdfsd', '2017-01-13', '1', '1');
INSERT INTO `news` VALUES ('5', 'fdsfsf', 'dasfsdfsd', '2017-01-13', '1', '1');
INSERT INTO `news` VALUES ('6', '放假啦', '<div style=\"text-align:center;\">\r\n	<span style=\"line-height:1.5;\">fdksjfhsdkjfhsdkjfhsdklfhsdkfhsdklfh</span>\r\n</div>', '2017-01-14', '0', '1');
INSERT INTO `news` VALUES ('7', 'fdsfsdfsdf', 'gdgffdg', '2017-01-14', '0', '1');

-- ----------------------------
-- Table structure for `repair`
-- ----------------------------
DROP TABLE IF EXISTS `repair`;
CREATE TABLE `repair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `repair_time` datetime DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of repair
-- ----------------------------
INSERT INTO `repair` VALUES ('8', '9', '2017-01-13 10:44:00', '用完了', '4', '0');
INSERT INTO `repair` VALUES ('9', '9', '2017-01-13 14:27:08', '门坏了', '5', '1');
INSERT INTO `repair` VALUES ('10', '9', '2017-01-13 22:05:53', '根本就不能用，骗人，哼', '4', '1');
INSERT INTO `repair` VALUES ('11', '10', '2017-01-14 10:11:47', '坏啦坏啦', '4', '0');
INSERT INTO `repair` VALUES ('12', '10', '2017-01-14 10:12:28', '坏啦坏啦', '4', '0');

-- ----------------------------
-- Table structure for `salary`
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `grant_time` datetime DEFAULT NULL,
  `salary` float NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary` VALUES ('3', '1', '2017-01-13 23:53:31', '12312', '0');
INSERT INTO `salary` VALUES ('5', '3', '2017-01-13 23:34:54', '123', '1');
INSERT INTO `salary` VALUES ('8', '10', '2017-01-14 13:01:04', '520', '0');

-- ----------------------------
-- Table structure for `server_type`
-- ----------------------------
DROP TABLE IF EXISTS `server_type`;
CREATE TABLE `server_type` (
  `server_id` int(11) NOT NULL AUTO_INCREMENT,
  `charge_sta` varchar(255) DEFAULT NULL,
  `charge_type` varchar(255) DEFAULT NULL,
  `ser_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of server_type
-- ----------------------------
INSERT INTO `server_type` VALUES ('9', '100/月', '擦玻璃', '维修服务费用');
INSERT INTO `server_type` VALUES ('10', '5000/月', '修剪草坪', '维修服务费用');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `floor_num` int(11) NOT NULL,
  `room_num` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `building_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `building_id` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('9', '彭帅钦', '123123', '18803836275', '2', 'A4021', '1', '3', '2017-01-13 18:09:03');
INSERT INTO `user` VALUES ('10', 'psq', '123123', '13071762655', '3', 'A402', '1', '5', '2017-01-14 09:46:10');
INSERT INTO `user` VALUES ('11', '小明', '123123', '13202656486', '3', '17226', '0', '5', '2017-01-14 12:46:05');
INSERT INTO `user` VALUES ('12', '小红', '123123', '18803836275', '2', '17226', '1', '3', '2017-01-14 12:46:41');
INSERT INTO `user` VALUES ('13', '小华', '123123', '18803836275', '3', '17226', '0', '3', '2017-01-14 12:47:08');
INSERT INTO `user` VALUES ('14', '小张', '123123', '18803836275', '4', '17226', '0', '3', '2017-01-14 12:47:43');
INSERT INTO `user` VALUES ('15', '啦啦', '123123', '13071730251', '3', '17226', '1', '3', '2017-01-14 12:48:22');
INSERT INTO `user` VALUES ('16', '放假啦', '123123', '110', '2', '15224', '0', '3', '2017-01-14 12:49:28');
INSERT INTO `user` VALUES ('17', '你猜', '123123', '1231231', '2', '15220', '0', '3', '2017-01-14 12:50:00');
INSERT INTO `user` VALUES ('18', '累死啦', '123123', '112', '6', '15524', '0', '3', '2017-01-14 12:50:38');
