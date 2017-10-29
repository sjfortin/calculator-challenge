CREATE TABLE calculations (
    id SERIAL PRIMARY KEY,
    first_number INT NOT NULL,
    second_number INT NOT NULL,
    operator TEXT NOT NULL,
    date DATE NOT NULL
);
