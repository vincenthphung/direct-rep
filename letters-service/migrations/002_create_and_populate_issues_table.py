steps = [
    [
        # "Create The Letter" UP ( reps REFERENCES NOT NULL needs to done)
        """
        CREATE TABLE issue(
        id SERIAL PRIMARY KEY NOT NULL,
        user_issue VARCHAR(1000) NOT NULL,
        openai_issue VARCHAR(1000) NOT NULL
        );
        INSERT INTO issue VALUES (1, 'Healthcare Reform', 'a single-payer healthcare system:\n');
        INSERT INTO issue VALUES (2, 'The LGBTQ+ Movement', 'expanding LGBTQ protections and rights:\n');
        INSERT INTO issue VALUES (3, 'Expanding Border Security', 'increasing surveilance at the US-Mexico border:\n');
        INSERT INTO issue VALUES (4, 'Criminal Justice Reform', 'reforming the criminal justice system:\n');
        INSERT INTO issue VALUES (5, 'Religious Freedom', 'protecting religious liberties:\n');
        INSERT INTO issue VALUES (6, 'Separation of Church and State', 'enforcing the separation of church and state:\n');
        INSERT INTO issue VALUES (7, 'Raising Federal Minimum Wage', 'raising the US minimum wage:\n');
        INSERT INTO issue VALUES (8, 'Green Energy', 'transitioning to green energy:\n');
        INSERT INTO issue VALUES (9, 'Social Security/Medicare/Medicaid', 'our current welfare programs:\n');
        INSERT INTO issue VALUES (10, '2020 Election Fraud', 'investigating voter fraud in the 2020 election:\n');
        INSERT INTO issue VALUES (11, 'Gun Law Reform', 'reforming firearm legislation:\n');
        INSERT INTO issue VALUES (12, 'Lowering Taxes', 'lowering taxes');
        INSERT INTO issue VALUES (13, 'Military Spending', 'expanding military spending');
        INSERT INTO issue VALUES (14, 'Congressional Term Limits', 'enacting term limits on Congress:\n');
        INSERT INTO issue VALUES (15, 'Supreme Court Term Limits', 'enacting limits on Supreme Court justices:\n');
        """,
        # SQL statement DOWN
        """
        DROP TABLE issue;
        """
    ]
]