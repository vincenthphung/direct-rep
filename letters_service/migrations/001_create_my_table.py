steps = [
    [
        # "Create The Letter" UP
        """
        CREATE TABLE letter(
            id SERIAL PRIMARY KEY NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            topic VARCHAR(1000) NOT NULL,
            stance BOOLEAN NOT NULL,
            content TEXT NOT NULL,
            user_id INTEGER NOT NULL
        );
        """,
        # SQL statement DOWN
        """
        DROP TABLE letter;
        """,
    ]
]
