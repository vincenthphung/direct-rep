steps = [
    [
        # "Create The Users" UP ( reps REFERENCES NOT NULL needs to done)
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            zipcode INTEGER NOT NULL,
            hashed_password VARCHAR(255) NOT NULL
        );
        """,
        # SQL statement DOWN
        """
        DROP TABLE users;
        """
    ]
]
