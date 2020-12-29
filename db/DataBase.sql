
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- Base de datos: `DelilahRestoApp`

CREATE DATABASE IF NOT EXISTS `DelilahRestoApp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `DelilahRestoApp`;

-- --------------------------------------------------------


-- TABLA `orders`


CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(60) NOT NULL DEFAULT 'Nuevo',
  `description` varchar(150) NOT NULL,
  `total` float NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` varchar(55) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- agregamos dos `orders`


INSERT INTO `orders` (`id`, `status`, `description`, `total`, `user_id`, `payment_method`, `createdAt`, `updatedAt`) VALUES
(56, 'Nuevo', '2 x Milanesa con Papas Fritas 3 x choripan', 2750, 1, 'Efectivo', '2020-12-28 20:40:09', '2020-12-28 20:40:09'),
(57, 'Nuevo', '2 x Milanesa con Papas Fritas 3 x choripan', 2750, 1, 'Efectivo', '2020-12-28 20:40:33', '2020-12-28 20:40:33');

-- --------------------------------------------------------


--  `orders_products`


CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `product_quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- agregamos tres `orders_products`


INSERT INTO `orders_products` (`id`, `orderId`, `productId`, `product_quantity`, `createdAt`, `updatedAt`) VALUES
(36, 56, 3, 3, '2020-12-28 20:40:10', '2020-12-28 20:40:10'),
(37, 57, 2, 2, '2020-12-28 20:40:33', '2020-12-28 20:40:33'),
(38, 57, 3, 3, '2020-12-28 20:40:33', '2020-12-28 20:40:33');

-- --------------------------------------------------------


--  `products`


CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- agregamos dos `products`


INSERT INTO `products` (`id`, `name`, `price`, `createdAt`, `updatedAt`) VALUES
(2, 'Milanesa con Papas Fritas', 700, '2020-12-26 22:29:49', '2020-12-26 22:29:49'),
(3, 'choripan', 450, '2020-12-26 22:29:49', '2020-12-26 22:29:49');

-- --------------------------------------------------------


--  `users`


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- agregamos dos `users`


INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `phone`, `address`, `password`, `createdAt`, `updatedAt`, `is_admin`) VALUES
(1, 'Yai', 'Yamil', 'Torres', 'torresyamil091@gmail.com', '1128798155', 'Intendente Alvear', 'joyita', '2020-12-22 05:01:04', '2020-12-22 05:01:04', 1),
(2, 'apodo', 'Apu', 'Deaoux', 'apudeauox@gmail.com', '112345678', 'humboldt', 'najasapemapetila', '2020-12-24 10:40:57', '2020-12-24 10:40:57', 0);




ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);
--


ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);
--

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);
--

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
--

ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--

ALTER TABLE `orders_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
--

ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
COMMIT;

