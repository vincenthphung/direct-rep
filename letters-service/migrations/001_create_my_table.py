steps = [
    [
        # "Create The Letter" UP
        """
        CREATE TABLE letter(
            id SERIAL PRIMARY KEY NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR(1000) NOT NULL,
            topic VARCHAR(1000) NOT NULL,
            stance BOOLEAN NOT NULL,
            content TEXT NOT NULL
        );
        """,
        # SQL statement DOWN
        """
        DROP TABLE letter;
        """
    ]
]
