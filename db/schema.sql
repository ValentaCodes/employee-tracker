DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL, -- Hold department name --
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary FLOAT,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    -- hold employee first name --
    last_name VARCHAR(30),
    -- hold employee last name --
    role_id INT,
    -- To hold reference to employee role --
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);