steps = [
    [
        # "Create The Rep" UP (add REFERENCE to letter table)
        """
        CREATE TABLE rep (
            rep_id SERIAL PRIMARY KEY NOT NULL,
            office VARCHAR(255) NOT NULL,
            level VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            party VARCHAR(255) NOT NULL,
            address VARCHAR(1000) NOT NULL,
            email VARCHAR(255) NOT NULL,
            letter_id INT,
            FOREIGN KEY (letter_id) REFERENCES letter(id) ON DELETE CASCADE
        );
        """,
        # SQL statement DOWN
        """
        DROP TABLE rep;
        """,
    ]
]
