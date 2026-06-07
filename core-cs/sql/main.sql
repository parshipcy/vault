-- MySQL Workbench --

-- CREATE TABLE: database name then table name*/
CREATE TABLE parship.students(
	ID int, -- we can use "not null", "unique" as constraint
    firstName varchar(255),
    lastName varchar(255),
    city varchar(255),
	salary int
);


use parship;

-- SELECT all columns and all rows from the table named students in the schema (or database) parship.*/
SELECT * FROM students;


-- INSERT INTO students table in the database parship*/
INSERT INTO parship.students(ID, firstName, lastName, city, salary)
VALUES(1, "Parship", "Chowdhury", "Agartala", 20000);
INSERT INTO parship.students(ID, firstName, lastName, city, salary)
VALUES(2, "Karan", "Sarkar", "Agartala", 50000);
INSERT INTO parship.students(ID, firstName, lastName, city, salary)
VALUES(3, "Karim", "Das", "Kolkata", 10000);
INSERT INTO parship.students(ID, firstName, lastName, city, salary)
VALUES(4, "Aryan", "Kumar", "Uttar Pradesh", 70000);


-- AND: returns rows only when all conditions are true
SELECT * FROM parship.students WHERE firstName = "Karan" AND lastName = "Sarkar";
-- OR: returns rows when at least one condition is true
SELECT * FROM parship.students WHERE firstName = "Parship" OR lastName = "Sarkar";


-- WHERE clause is used to extract only those records that fulfill a specified criterion
SELECT * FROM parship.students WHERE ID = 2;


-- ORDER BY is used to sort the result by a specified column -- asending order by default and use DESC for descending order
SELECT * FROM parship.students ORDER BY salary;
SELECT * FROM parship.students ORDER BY salary DESC;


-- In a table, some of the columns may contain duplicate values. This is Not a problem, sometimes you will want to list only the different values in a table.
SELECT DISTINCT(firstName) FROM parship.students;


-- DELETE statement
SELECT * FROM students;   /*to show the table contents*/   /*no need to write the database and table name as we already used it at line 11*/
DELETE FROM parship.students WHERE ID = 3;


-- to get curr date and time
SELECT NOW(), CURDATE(), CURTIME();


-- different functions
SELECT AVG(salary) FROM students;
select sum(salary) from students;
select ucase(city) from students;
select lcase(city) from students;
select min(salary) from students;
select lastName, substr(firstName,1,2) from students;
-- many mores are there -- see docs/google


-- find the total sum from each customer
select firstName, sum(salary) from students group by firstName;


-- we want to find if any of the customers have a total order of more than 2000
select firstName, sum(salary) from students
group by firstName having sum(salary)>20000;


-- add location column
alter table students add location varchar(255);


-- to delete a column in a table
alter table students drop column location;


-- to change the data types of a column in a table
alter table students modify column city boolean;


-- by using alias you can give a table or column another name
select city as cityName from students;


-- to delete tables
drop table students;


-- to delete the database
drop database parship;


-- to select a range of data use between
select * from students where salary between 10000 and 50000;


-- in operator allows you to specify multiple values in a where clause
select * from students where firstName in ("Parship", "karan");


-- "n" at last and "y" at middle of first name
select * from students where firstName like "%n";
select * from students where firstName like "%y%"; 


-- truncate is used to delete complete data from an existing table
truncate table students;


-- update
update students set salary=10000 where ID=2;


-- constraints are used to specify rules for the data in a table
-- "not null", "unique", "check()"


-- top 5 data
select * from students limit 3;


/*
Constraints:
NOT NULL → Ensures a column cannot contain NULL values.
UNIQUE → Ensures all values in a column are different.
PRIMARY KEY → Uniquely identifies each row in a table.
FOREIGN KEY → Enforces a relationship between two tables.
CHECK → Ensures column values satisfy a specified condition.
DEFAULT → Assigns a value automatically if none is provided.
*/


/*
Primary key:-
1. a table can have only one primary key(unique + not null)
2. foreign key - to make relationship between 2 or more than 2 tables
3. one table contain primary key and other table contain foreign key
4. a common column in both the tables (common column should have same data types)
5. primary key(parent table) + (foreign key) (child table)
*/
use parship;
create table orders(
	orderid int primary key,
	ordernumber int,
	location varchar(255)
);
insert into orders(orderid, ordernumber, location) values(10, 123456, "XYZ");
insert into orders(orderid, ordernumber, location) values(11, 345678, "MNO");
insert into orders(orderid, ordernumber, location) values(12, 567891, "ABC");
select * from orders;

create table persons(
	perosnid int,
	personname varchar(255),
	orderid int,
	foreign key(orderid) references orders(orderid)
);


/*
Join operation:
A join clause is used to combine rows from two or more tables based on a
related column between them
INNER JOIN/JOIN -> return rows that have matching values in both tables.
LEFT JOIN -> return all rows from the left table, even if there are no matches in the right table
RIGHT JOIN -> return all rows from the right table,
FULL JOIN -> return rows when there is a match in one of the tables
*/
create table persons(
	p_id int,
	firstname varchar(255),
	lastname varchar(255),
	address varchar(255),
	city varchar(255)
);
insert into persons(p_id, firstname, lastname, address, city) values(1, "Parship", "Chowdhury", "STB", "STB");
insert into persons(p_id, firstname, lastname, address, city) values(2, "Karan", "Sarkar", "Amtali", "Agartala");
select * from persons;

create table orders(
	o_id int primary key,
	order_no int,
	p_id int
);
insert into orders(o_id, order_no, p_id) values(1, 23452, 3);
insert into orders(o_id, order_no, p_id) values(2, 23487, 1);
insert into orders(o_id, order_no, p_id) values(3, 23466, 2);
insert into orders(o_id, order_no, p_id) values(4, 23432, 2);
insert into orders(o_id, order_no, p_id) values(5, 23322, 2);
select * from orders;

select orders.p_id, persons.firstname, persons.lastname, orders.order_no from persons inner join orders on persons.p_id = orders.p_id;

select persons.firstname, persons.lastname, orders.order_no, orders.p_id from persons left join orders on persons.p_id = orders.p_id;


-- increment
CREATE TABLE Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);
INSERT INTO Students (name) VALUES ('A');
INSERT INTO Students (name) VALUES ('B');


/*
IMP:
DDL: Data Definition Language -> create, drop, alter, truncate
DQL: Data Query Language -> select
DML: Data Manipulation Language -> insert, delete, update
DCL: Data Control Language -> grant, revoke
TCL: Transaction Control Language -> commit, savepoint, rollback

GRANT: Used to give specific permissions on database objects to a user or role.
REVOKE: Used to remove previously granted permissions from a user or role.
COMMIT: Permanently saves all changes made during the current transaction.
SAVEPOINT: Creates a checkpoint within a transaction to which changes can be rolled back.
ROLLBACK: Undoes changes made in the current transaction, either fully or up to a savepoint.
*/