const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;


app.use(express.json());


const db = new sqlite3.Database('./canciones.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos SQLite');
      
        db.exec(`
            CREATE TABLE IF NOT EXISTS canciones (
                id INT PRIMARY KEY,
                nombre VARCHAR(100),
                genero VARCHAR(20),
                artista VARCHAR(30),
                disquera VARCHAR(50)
            );

            INSERT OR IGNORE INTO canciones (id, nombre, genero, artista, disquera) VALUES
                (1, 'El Rey', 'Ranchera', 'Vicente Fernández', 'Sony Music México'),
                (2, 'Cielo Rojo', 'Ranchera', 'Flor Silvestre', 'RCA Victor'),
                (3, 'El Sonidito', 'Banda', 'Hechizeros Band', 'Disa Records'),
                (4, 'Tragos Amargos', 'Norteño', 'Ramón Ayala', 'Freddie Records'),
                (5, 'La Chona', 'Banda', 'Los Tucanes de Tijuana', 'Universal Music Latino'),
                (6, 'Amor Prohibido', 'Tejano', 'Selena', 'EMI Latin'),
                (7, 'El Gavilán', 'Corrido', 'Los Huracanes del Norte', 'Garmex Music'),
                (8, 'Mi Tesoro', 'Banda', 'Banda MS', 'Lizos Music'),
                (9, 'La Puerta Negra', 'Ranchera', 'Los Tigres del Norte', 'Fonovisa Records'),
                (10, 'El Corrido de Juanito', 'Corrido', 'Calibre 50', 'Disa Records');
        `, (err) => {
            if (err) {
                console.error('Error al crear la tabla o insertar datos:', err);
            } else {
                console.log('Tabla creada y datos insertados correctamente');
            }
        });
    }
});


app.get('/api/canciones', (req, res) => {
    db.all('SELECT * FROM canciones', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/canciones/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM canciones WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Canción no encontrada' });
            return;
        }
        res.json(row);
    });
});


app.post('/api/canciones', (req, res) => {
    const { id, nombre, genero, artista, disquera } = req.body;
    
    if (!id || !nombre) {
        res.status(400).json({ error: 'ID y nombre son requeridos' });
        return;
    }

    const stmt = db.prepare('INSERT INTO canciones (id, nombre, genero, artista, disquera) VALUES (?, ?, ?, ?, ?)');
    stmt.run(id, nombre, genero, artista, disquera, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            message: 'Canción creada exitosamente',
            id: id
        });
    });
    stmt.finalize();
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});