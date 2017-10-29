CREATE TABLE calculations (
    id SERIAL PRIMARY KEY,
    first_number NUMERIC NOT NULL,
    second_number NUMERIC NOT NULL,
    operator TEXT NOT NULL,
    name TEXT,
    date_created TIMESTAMP NOT NULL
);
