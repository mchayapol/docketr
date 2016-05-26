-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 22, 2016 at 01:56 AM
-- Server version: 5.6.30
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theone`
--

-- --------------------------------------------------------

--
-- Table structure for table `docketr_customer`
--

CREATE TABLE `docketr_customer` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `district_id` varchar(10) DEFAULT NULL,
  `amphoe_id` varchar(10) DEFAULT NULL,
  `province_id` varchar(10) DEFAULT NULL,
  `tax_no` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `car_plate_no` varchar(45) DEFAULT NULL,
  `branch` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `docketr_customer`
--

INSERT INTO `docketr_customer` (`id`, `name`, `company_name`, `address`, `district_id`, `amphoe_id`, `province_id`, `tax_no`, `phone`, `car_plate_no`, `branch`) VALUES
(1, 'หจก.เดอะวันปิโตรเลียม (ประเทศไทย)', 'หจก. กรีนเอิร์ธปิโตรเลียม (ประเทศไทย)', '9/7 หมู่ 3 ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20001', NULL, NULL, NULL, '200188712455', NULL, 'ศร 8291', 2),
(2, 'หจก. กรีนเอิร์ธปิโตรเลียม (ประเทศไทย)', 'หจก. กรีนเอิร์ธปิโตรเลียม (ประเทศไทย)', '17/80 หมู่ 1 ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 110', NULL, NULL, NULL, '12345787154', NULL, '3 กส 382', 0),
(5, 'บริษัท สามล้อจำกัด', NULL, 'ชลบุรี', NULL, NULL, NULL, '1234567890123', NULL, 'กก 1234', 0),
(8, 'บริษัท มหาชัยทรานสปอร์ท', NULL, '1234 แขวงคลองเตย เขตคลองเตย กรุงเทพ 10000', NULL, NULL, NULL, '9876543216549', NULL, 'ฟฟ 555', 0),
(9, 'หจก สบายใจไทยแลนด์', NULL, 'ตราด', NULL, NULL, NULL, '1230001230000', NULL, 'ทท 654', 0),
(10, 'บริษัท สบายใจไทยแลนด์', NULL, 'ตราด', NULL, NULL, NULL, '1234561234564', NULL, 'กก 789', 0),
(13, 'สวัสดีนนทบุรี', NULL, 'นนทบุรี', NULL, NULL, NULL, '9991114445559', NULL, 'มข 999', 0);

-- --------------------------------------------------------

--
-- Table structure for table `docketr_product`
--

CREATE TABLE `docketr_product` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `name_eng` varchar(45) DEFAULT NULL,
  `price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `docketr_product`
--

INSERT INTO `docketr_product` (`id`, `name`, `name_eng`, `price`) VALUES
(1, 'แก๊ซโซฮอล 95', 'GASOHOL 95', 25.17),
(2, 'แก๊ซโซฮอล 91', 'GASOHOL 91', 24.75),
(3, 'แก๊ซโซฮอล E20', 'E20', 22.61),
(4, 'ดีเซล', 'DIESEL', 24.06),
(5, 'ดีเซลพลัส', 'DIESEL PLUS', 22.6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `docketr_customer`
--
ALTER TABLE `docketr_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `docketr_product`
--
ALTER TABLE `docketr_product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `docketr_customer`
--
ALTER TABLE `docketr_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `docketr_product`
--
ALTER TABLE `docketr_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
