import { 
  mysqlTable, 
  varchar, 
  int, 
  text, 
  timestamp, 
  mysqlEnum, 
  serial 
} from "drizzle-orm/mysql-core";
// 👈 assuming jobs schema is in a separate file

// Jobs table schema
export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  jobType: mysqlEnum("job_type", [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Remote",
    "Freelance"
  ]).notNull(),

  salaryMin: int("salary_min"),
  salaryMax: int("salary_max"),

  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().defaultNow().notNull()
});


// Resumes table schema
export const resumes = mysqlTable("resumes", {
  id: serial("id").primaryKey(),
  jobId: int("job_id")  // 👈 add foreign key column
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }), 

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  skills: text("skills").notNull(), 
  links: text("links").notNull(),   
  description: text("description").notNull(),
  status: mysqlEnum("status", ["Pending", "Shortlisted", "Not Shortlisted"])
    .default("Pending")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().defaultNow().notNull()
});



export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // hashed password
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersAdmin = mysqlTable("usersadmin", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // hashed password
  createdAt: timestamp("created_at").defaultNow().notNull(),
});