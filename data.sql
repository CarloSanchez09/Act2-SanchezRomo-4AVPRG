CREATE TABLE canciones (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    genero VARCHAR(20),
    artista VARCHAR(30),
    disquera VARCHAR(50)
);

INSERT INTO canciones (id, nombre, genero, artista, disquera) VALUES
    (1,'El Rey', 'Ranchera', 'Vicente Fernández', 'Sony Music México'),
    (2,'Cielo Rojo', 'Ranchera', 'Flor Silvestre', 'RCA Victor'),
    (3,'El Sonidito', 'Banda', 'Hechizeros Band', 'Disa Records'),
    (4,'Tragos Amargos', 'Norteño', 'Ramón Ayala', 'Freddie Records'),
    (5,'La Chona', 'Banda', 'Los Tucanes de Tijuana', 'Universal Music Latino'),
    (6,'Amor Prohibido', 'Tejano', 'Selena', 'EMI Latin'),
    (7,'El Gavilán', 'Corrido', 'Los Huracanes del Norte', 'Garmex Music'),
    (8,'Mi Tesoro', 'Banda', 'Banda MS', 'Lizos Music'),
    (9,'La Puerta Negra', 'Ranchera', 'Los Tigres del Norte', 'Fonovisa Records'),
    (10,'El Corrido de Juanito', 'Corrido', 'Calibre 50', 'Disa Records');


