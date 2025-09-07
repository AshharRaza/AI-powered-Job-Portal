CREATE TABLE `usersadmin` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usersadmin_id` PRIMARY KEY(`id`),
	CONSTRAINT `usersadmin_email_unique` UNIQUE(`email`)
);
