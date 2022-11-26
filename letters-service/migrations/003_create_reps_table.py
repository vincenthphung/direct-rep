steps = [
    [
        # "Create The Rep Selected" UP (add REFERENCE to letter table)
        """
        CREATE TABLE rep-selected (
            id SERIAL PRIMARY KEY NOT NULL,
            office VARCHAR(255) NOT NULL,
            level VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            party VARCHAR(255) NOT NULL,
            address VARCHAR(1000) NOT NULL,
            letter REFERENCE NOT NULL
        );
        """,
        # SQL statement DOWN
        """
        DROP TABLE rep-selected;
        """
    ]
]
