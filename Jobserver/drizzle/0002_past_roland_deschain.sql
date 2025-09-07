ALTER TABLE `resumes` ADD `status` enum('Pending','Shortlisted','Not Shortlisted') DEFAULT 'Pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `jobs` DROP COLUMN `status`;