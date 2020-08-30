USE sakila;
USE todoapp_bbdd;

CREATE TABLE IF NOT EXISTS tareas (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    tarea CHAR(50),
    completed boolean not null default false
    );
    
INSERT INTO tareas (tarea)
VALUES ('Bajar al perro'),
('Comprar pan'),
('Pedir hora peluqueria perruna'),
('Hacer el puto trabajo de bases de datos');

    
DROP TABLE tareas;

TRUNCATE TABLE tareas;

DELETE FROM tareas
WHERE user_id = 4;

SELECT * FROM tareas WHERE user_id = 5;

UPDATE tareas SET completed = NOT completed
WHERE user_id = 7;


SELECT * FROM tareas;