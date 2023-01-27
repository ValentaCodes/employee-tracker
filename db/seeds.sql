INSERT INTO department (department_name)
VALUES 
('Dev Ops'),
('Design'),
('Engineering');

INSERT INTO roles (id, title, salary, department_id)
VALUES (101, 'Software Engineer', 120000.32, 1),
(303, 'UX Designer', 99000, 3),
(202, 'Software Engineer Intern', 80000, 1),
(404, 'Build Engineer', 125000.87,2),
(001, 'Manager', 300000,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cornelius', 'Davis', 001, 0),
('Micheal', 'Jordahn', 202, 1),
('James', 'Bund', 404, 0),
('Bat', 'Man', 303, 0);